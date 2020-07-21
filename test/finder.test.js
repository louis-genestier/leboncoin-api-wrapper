const assert = require('assert');
const Finder = require('../lib/finder');

describe('Finder', function() {
  this.timeout(0);

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

  it('should set a maximum price', () => {
    const finder = new Finder();
    const maxPrice = 15;
    finder.setMaxPrice(maxPrice);
    assert.strictEqual(finder.getMaxPrice(), maxPrice);
  });

  it('should set a minimum price', () => {
    const finder = new Finder();
    const minPrice = 50;
    finder.setMinPrice(minPrice);
    assert.strictEqual(finder.getMinPrice(), minPrice);
  });

  it('should returns ads', async() => {
    const data = await finder.search();
    assert.strictEqual(data.ads.length, limit);
  });

  describe('buildBody', () => {
    it('should returns the right category', () => {
      finder.setCategory('livres');
      const body = finder.buildBody();
      const parsed = JSON.parse(body);
      assert.strictEqual(parsed.filters.category.id, '27');
    });

    it('should returns the right max price', () => {
      finder.setMaxPrice(15);
      const body = finder.buildBody();
      const parsed = JSON.parse(body);
      assert.strictEqual(parsed.filters.ranges.price.max, 15);
    });

    it('should returns the right min price', () => {
      finder.setMinPrice(10);
      const body = finder.buildBody();
      const parsed = JSON.parse(body);
      assert.strictEqual(parsed.filters.ranges.price.min, 10);
    })
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