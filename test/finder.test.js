const assert = require('assert');
const Finder = require('../lib/finder');

describe('Finder', function() {
  this.timeout(0);

  const limit = 10;
  const locations = [
    {
      'city': 'Paris',
      'zipcode': '75005',
    }, {
      'city': 'Montreuil',
      'zipcode': '93100',
    },
  ];
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

  it('should set a and get the locations', () => {
    const finder = new Finder();
    finder.setLocations(locations);
    assert.strictEqual(finder.getLocations(), locations);
  });

  it('should set a minimum amount of rooms', () => {
    const finder = new Finder();
    const minRooms = 3;

    finder.setMinRooms(minRooms);
    assert.strictEqual(finder.getMinRooms(), minRooms);
  });

  it('should set a maximum amount of rooms', () => {
    const finder = new Finder();
    const maxRooms = 3;

    finder.setMaxRooms(maxRooms);
    assert.strictEqual(finder.getMaxRooms(), maxRooms);
  });

  it('should set a minimum square', () => {
    const finder = new Finder();
    const minSquare = 30;

    finder.setMinSquare(minSquare);
    assert.strictEqual(finder.getMinSquare(), minSquare);
  });

  it('should set a maximum square', () => {
    const finder = new Finder();
    const maxSquare = 30;

    finder.setMaxSquare(maxSquare);
    assert.strictEqual(finder.getMaxSquare(), maxSquare);
  });

  it('should set the right estate type', () => {
    const finder = new Finder();
    const types = ['appartement'];

    finder.setEstateType(types);
    assert.strictEqual(finder.getEstateTypes()[0], '2');
  })

  it('should set furnished', () => {
    const finder = new Finder();
    finder.setFurnished(true);
    assert.strictEqual(finder.getFurnished()[0], '1');
  });

  it('should set the right sell type', () => {
    const finder = new Finder();
    const types = ['old', 'new'];

    finder.setSellType(types);
    assert.strictEqual(finder.getSellType()[1], 'new');
  });

  it('should returns ads', async() => {
    const data = await finder.search();
    assert.strictEqual(data.ads.length, limit);
  });

  describe('buildBody', () => {
    const finder = new Finder();

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
    });

    it('should returns the right locations', () => {
      finder.setLocations(locations);
      const body = finder.buildBody();
      const parsed = JSON.parse(body);
      assert.strictEqual(JSON.stringify(parsed.filters.location.locations), JSON.stringify(locations));
    });

    it('should returns the right amount of minimum rooms', () => {
      const minRooms = 3;
      finder.setMinRooms(minRooms);
      const body = finder.buildBody();
      const parsed = JSON.parse(body);
      assert.strictEqual(parsed.filters.ranges.rooms.min, minRooms);
    });

    it('should returns the right min square', () => {
      const minSquare = 25;
      finder.setMinSquare(minSquare);
      const body = finder.buildBody();
      const parsed = JSON.parse(body);
      assert.strictEqual(parsed.filters.ranges.square.min, minSquare);
    });

    it('should returns the right estate type', () => {
      const estateType = ['appartement'];
      finder.setEstateType(estateType);
      const body = finder.buildBody();
      const parsed = JSON.parse(body);
      assert.strictEqual(parsed.filters.enums.real_estate_type[0], '2');
    });

    it('should returns the right furnished', () => {
      finder.setFurnished(false);
      const body = finder.buildBody();
      const parsed = JSON.parse(body);
      assert.strictEqual(parsed.filters.enums.furnished[0], '2');
    });

    it('should returns the right sell type', () => {
      const sellType = ['old'];
      finder.setSellType(sellType);
      const body = finder.buildBody();
      const parsed = JSON.parse(body);
      assert.strictEqual(parsed.filters.enums.immo_sell_type[0], sellType[0]);
    });

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