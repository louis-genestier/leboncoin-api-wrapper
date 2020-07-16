const assert = require('assert');
const Finder = require('../lib/finder');

describe('Finder', () => {

  const limit = 10;
  const finder = new Finder();
  finder.setOrder('desc');
  finder.setKeywords('livre');
  finder.setLimit(limit);
  finder.setPage(1);

  it('should set and get keyword', () => {
    const finder = new Finder();
    const keyword = 'manga';
    finder.setKeywords(keyword);
    assert.strictEqual(finder.getKeywords(), keyword);
  });

  it('should set and get page', () => {
    const finder = new Finder();
    const page = 1;
    finder.setPage(page);
    assert.strictEqual(finder.getPage(), page);
  });

  it('should set and get order', () => {
    const finder = new Finder();
    const order = 'desc';
    finder.setOrder(order);
    assert.strictEqual(finder.getOrder(), order);
  });

  it('should set and get limit', () => {
    const finder = new Finder();
    const limit = 10;
    finder.setLimit(limit);
    assert.strictEqual(finder.getLimit(), limit);
  });

  it('should set and get category', () => {
    const finder = new Finder();
    const category = 'informatique';
    finder.setCategory(category);
    assert.strictEqual(finder.getCategory(), '15');
  });

  it('should returns ads', async() => {
    const data = await finder.search();
    assert.strictEqual(data.ads.length, limit);
  });

  describe('getPhoneNumber', () => {

    it('should returns phone number when possible', async() => {
      const data = await finder.search();
      ads = data.ads.filter((ad) => ad.has_phone);
      if(ads[0]) {
        assert.notStrictEqual(ads[0].phone_number, undefined)
      } else {
        assert.ok(true);
      }
    });

  })

});