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
    this.resource = `/spaces/${this.spaceId}/environments/${this.environmentId}/entries`;
  }

  async getDisciplinesData() {
    const query = {
      content_type: 'discipline',
      'fields.parent': true,
      select: 'fields',
    };

    const resParentDisciplines = await http.get(this.resource, {
      params: query,
    });
    const parentDisciplines = resParentDisciplines.data.items
      .map((i) => ({
        expand: false,
        content_type: query.content_type,
        cost: this.getTrimmedValue(i.fields.cost),
        foci: this.getTrimmedValue(i.fields.foci),
        level: i.fields.level || null,
        power: this.getTrimmedValue(i.fields.power),
        quote: this.extractFieldValue(i.fields.quote),
        summary: this.extractFieldValue(i.fields.summary),
        system: this.extractFieldValue(i.fields.system),
        testPool: this.getTrimmedValue(i.fields.testPool),
        title: this.getTrimmedValue(i.fields.title),
        children: [],
      }))
      .sort((a, b) => {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

    const promises = parentDisciplines.map((pd) =>
      this.getChildPowers(pd.power),
    );
    const allChildPowers = await Promise.all(promises);
    parentDisciplines.forEach((pd) => {
      const childrenIdx = allChildPowers.findIndex(
        (cpa) => cpa.length > 0 && cpa[0].power === pd.power,
      );
      pd.children =
        childrenIdx === -1
          ? []
          : allChildPowers[childrenIdx].sort((a, b) => a.level - b.level);
    });
    return parentDisciplines;
  }

  // takes the name of the parentDiscipline
  async getChildPowers(parentDiscipline) {
    const query = {
      content_type: 'discipline',
      'fields.parent': false,
      'fields.power': parentDiscipline,
      select: 'fields',
    };
    const res = await http.get(this.resource, { params: query });
    const childPowers = res.data.items.map((i) => ({
      content_type: query.content_type,
      cost: this.getTrimmedValue(i.fields.cost),
      errata: this.extractFieldValue(i.fields.errata),
      exceptionalLong: this.extractFieldValue(i.fields.exceptionalLong),
      foci: this.getTrimmedValue(i.fields.foci),
      focusDescriptor: this.extractFieldValue(i.fields.focusDescriptor),
      level: i.fields.level || null,
      power: this.getTrimmedValue(i.fields.power),
      summary: this.extractFieldValue(i.fields.summary),
      system: this.extractFieldValue(i.fields.system),
      testPool: this.getTrimmedValue(i.fields.testPool),
      title: this.getTrimmedValue(i.fields.title),
    }));
    return childPowers;
  }

  async getPowerByName(power) {
    const query = {
      content_type: 'discipline',
      'fields.power': power,
      select: 'fields',
    };
    return http.get(this.resource, {
      params: query,
    });
  }

  getTrimmedValue(field) {
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
