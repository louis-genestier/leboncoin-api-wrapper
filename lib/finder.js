const rp = require('request-promise');
const categoriesEnum = require('../enum/categories.enum');

class Finder {
  setKeywords(keywords) {
    this.keywords = keywords;
  }

  setPage(page) {
    this.page = page;
  }

  setOrder(order) {
    this.order = order;
  }

  setLimit(limit) {
    this.limit = limit;
  }

  setCategory(category) {
    this.category = categoriesEnum[category.toUpperCase()];
  }

  getKeywords() {
    return this.keywords;
  }

  getPage() {
    return this.page;
  }

  getOrder() {
    return this.order;
  }

  getLimit() {
    return this.limit;
  }

  getCategory() {
    return this.category ? this.category.toString() : null;
  }

  buildBody() {
    const body = {
      limit: this.getLimit(),
      page: this.getPage(),
      owner_type: 'all',
      sort_by: 'time',
      filters: {
        enums: {
          ad_type: ['offer'],
        },
        keywords: {
          type: 'all',
          text: this.getKeywords(),
        },
      },
      sort_order: this.getOrder(),
    };

    if (this.getCategory()) {
      Object.assign(body.filters, { category: { id: this.getCategory() } });
    }

    return JSON.stringify(body);
  }

  // eslint-disable-next-line class-methods-use-this
  async getPhoneNumber(id) {
    const options = {
      method: 'POST',
      uri: 'https://api.leboncoin.fr/api/utils/phonenumber.json',
      headers: {
        Host: 'api.leboncoin.fr',
        'User-Agent': 'LBC;iOS;13.2.2;iPhone;phone;08AE8CBB-0C52-4881-BFF4-01F3E7F627F2;wifi;5.4.8;12.12',
      },
      form: {
        list_id: id,
      },
      transform: JSON.parse,
    };

    try {
      const { utils } = await rp(options);
      return utils.phonenumber;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getFormattedAds(ads) {
    const formattedAds = [];

    for await (const ad of ads) {
      if (ad.has_phone) {
        ad.phone_number = await this.getPhoneNumber(ad.list_id);
      }

      formattedAds.push(ad);
    }

    return formattedAds;
  }

  async search() {
    const json = this.buildBody();
    const options = {
      method: 'POST',
      uri: 'https://api.leboncoin.fr/finder/search',
      headers: {
        Host: 'api.leboncoin.fr',
        'User-Agent': 'LBC;iOS;13.2.2;iPhone;phone;08AE8CBB-0C52-4881-BFF4-01F3E7F627F2;wifi;5.4.8;12.12',
        'Content-Type': 'application/json',
      },
      body: json,
      transform: JSON.parse,
    };

    try {
      const resp = await rp(options);

      const ads = await this.getFormattedAds(resp.ads);

      return {
        currentPage: this.page,
        pages: Math.ceil(resp.total / this.limit),
        results: resp.total,
        ads,
      };
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

module.exports = Finder;
