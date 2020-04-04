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
        cost: i.fields.cost || null,
        foci: i.fields.foci || null,
        level: i.fields.level || null,
        power: i.fields.power || null,
        quote: this.extractFieldValue(i.fields.quote) || null,
        summary: this.extractFieldValue(i.fields.summary) || null,
        system: this.extractFieldValue(i.fields.system) || null,
        testPool: i.fields.testPool || null,
        title: i.fields.title || null,
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
    // return res;
    const childPowers = res.data.items.map((i) => ({
      cost: i.fields.cost || null,
      level: i.fields.level || null,
      power: i.fields.power || null,
      summary: this.extractFieldValue(i.fields.summary),
      system: this.extractFieldValue(i.fields.system),
      title: i.fields.title || null,
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
