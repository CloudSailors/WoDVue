/* eslint-disable indent */
import axios from 'axios';

let http = null;
class APIContentful {
  constructor({ url }) {
    http = axios.create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN_CONTENT_DELIVERY}`,
      },
    });

    this.spaceId = process.env.VUE_APP_CONTENTFUL_SPACE_ID;
    this.environmentId = process.env.VUE_APP_CONTENTFUL_ENVIRONMENT_ID;
    this.resourceBase = `/spaces/${this.spaceId}/environments/${this.environmentId}`;

    // this is an array of objects, each object has some necessary
    // info about a contentType
    this.contentTypeInfo = this.buildContentTypeInfo();
  }

  getResource(resource) {
    return `${this.resourceBase}\\${resource}`;
  }

  buildContentTypeInfo() {
    const contentTypeInfoStr = process.env.VUE_APP_CONTENTFUL_CONTENT_TYPE_INFO;
    return contentTypeInfoStr.split(',').map((ciStr) => {
      const [
        contentType,
        contentTypeId,
        parentKeyField,
        sortParent,
        sortChild,
      ] = ciStr.split('|');
      return {
        contentType,
        contentTypeId, // content type id we use when querying contentful
        parentKeyField, // the field we look for when getting child entries
        sortParent, // field we sort parent entries by
        sortChild, // field we sort child entries by
      };
    });
  }

  getContentTypeId(contentType) {
    const idx = this.contentTypeInfo.findIndex(
      (cti) => cti.contentType === contentType,
    );
    return idx > -1 ? this.contentTypeInfo[idx].contentTypeId : null;
  }

  async getContentbyTypeAsync(contentType) {
    const contentTypeInfo = this.getContentTypeInfoByField(
      'contentType',
      contentType,
    );
    if (!contentTypeInfo) {
      console.log(
        `Error : getContentByType : getContentTypeInfo is null for contentType ${contentType}`,
      );
      return [];
    }
    const {
      contentTypeId,
      parentKeyField,
      sortParent,
      sortChild,
    } = contentTypeInfo;

    const parentEntries = await this.getParentEntriesAsync(
      contentTypeId,
      contentType,
      sortParent,
    );
    const allEntryData = await this.loadChildEntriesAsync(
      parentEntries,
      contentTypeId,
      contentType,
      parentKeyField,
      sortChild,
    );
    return allEntryData;
  }

  async getParentEntriesAsync(contentTypeId, contentType, sortParent) {
    const queryGetParentEntries = {
      content_type: contentTypeId,
      'fields.parent': true,
    };
    const resourceEntries = this.getResource('entries');
    const resParentEntries = await this.queryContentfulAsync(
      resourceEntries,
      queryGetParentEntries,
    );
    return this.extractEntryDataFromResponse(
      resParentEntries,
      contentType,
      { expand: false },
      sortParent,
    );
  }

  async loadChildEntriesAsync(
    parentEntries,
    contentTypeId,
    contentType,
    parentKeyField,
    sortChild,
  ) {
    const promises = parentEntries.map((pe) =>
      this.getChildEntriesForParentAsync(
        contentTypeId,
        contentType,
        parentKeyField,
        pe[parentKeyField],
        sortChild,
      ),
    );
    const allChildEntries = await Promise.all(promises);
    parentEntries.forEach((pe) => {
      const childrenIdx = allChildEntries.findIndex(
        (ce) => ce.length > 0 && ce[0][parentKeyField] === pe[parentKeyField],
      );
      pe.children = childrenIdx === -1 ? [] : allChildEntries[childrenIdx];
    });

    return parentEntries;
  }

  async getChildEntriesForParentAsync(
    contentTypeId,
    contentType,
    parentKeyField,
    parentFieldValue,
    sortChild,
  ) {
    const keyField = `fields.${parentKeyField}`;
    const query = {
      content_type: contentTypeId,
      'fields.parent': false,
    };
    query[keyField] = parentFieldValue;
    const resource = this.getResource('entries');
    const resChildEntries = await this.queryContentfulAsync(resource, query);
    const childEntries = this.extractEntryDataFromResponse(
      resChildEntries,
      contentType,
      null,
      sortChild,
    );
    // const childEntries = resChildEntries.data.items.map((i) => ({
    //   contentType: contentType,
    //   cost: this.getTrimmedValue(i.fields.cost),
    //   errata: this.extractFieldValue(i.fields.errata),
    //   exceptionalLong: this.extractFieldValue(i.fields.exceptionalLong),
    //   foci: this.getTrimmedValue(i.fields.foci),
    //   focusDescriptor: this.extractFieldValue(i.fields.focusDescriptor),
    //   level: i.fields.level || null,
    //   power: this.getTrimmedValue(i.fields.power),
    //   summary: this.extractFieldValue(i.fields.summary),
    //   system: this.extractFieldValue(i.fields.system),
    //   testPool: this.getTrimmedValue(i.fields.testPool),
    //   title: this.getTrimmedValue(i.fields.title),
    // }));
    return childEntries;
  }

  extractEntryDataFromResponse(
    resContentful,
    contentType,
    initialVals = null,
    sortField = null,
  ) {
    const entryDataUnsorted = resContentful.data.items
      .map((i) =>
        Object.keys(i.fields).reduce(
          (obj, fieldName) => {
            obj[fieldName] = !i.fields[fieldName].nodeType
              ? this.getTrimmedValue(i.fields[fieldName])
              : this.extractFieldValue(i.fields[fieldName]);
            return obj;
          },
          { contentType },
        ),
      )
      .map((i) => {
        if (initialVals) {
          Object.keys(initialVals).forEach((k) => {
            i[k] = initialVals[k];
          });
          return i;
        }
        return i;
      });
    if (sortField) {
      return this.getSortedEntryData(entryDataUnsorted, sortField);
    }
    return entryDataUnsorted;
  }

  async queryContentfulAsync(resource, query) {
    return http.get(resource, { params: query });
  }

  getContentTypeIdFromResponse(resContentful) {
    return resContentful.items[0].contentType.sys.id;
  }

  getContentTypeInfoByField(fieldName, fieldValue) {
    const idx = this.contentTypeInfo.findIndex(
      (cti) => cti[fieldName] === fieldValue,
    );
    return idx > -1 ? this.contentTypeInfo[idx] : null;
  }

  getSortedEntryData(unsortedData, sortField) {
    return unsortedData.sort((a, b) => {
      const fieldA =
        a[sortField] && isNaN(a[sortField])
          ? a[sortField].toUpperCase()
          : a[sortField];
      const fieldB =
        b[sortField] && isNaN(b[sortField])
          ? b[sortField].toUpperCase()
          : b[sortField];
      if (fieldA < fieldB) {
        return -1;
      }
      if (fieldA > fieldB) {
        return 1;
      }
      return 0;
    });
  }

  getTrimmedValue(field) {
    if (!isNaN(field)) {
      return field;
    }
    return field ? field.trim() : null;
  }

  extractFieldValue(fieldObj) {
    if (
      fieldObj &&
      fieldObj.content &&
      fieldObj.content[0] &&
      fieldObj.content[0].content &&
      fieldObj.content[0].content[0] &&
      fieldObj.content[0].content[0].value
    ) {
      return fieldObj.content[0].content[0].value.trim();
    }
    return null;
  }
}

export default new APIContentful({
  url: process.env.VUE_APP_CONTENTFUL_BASE_URL,
});
