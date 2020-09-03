# Leboncoin API wrapper [![codecov](https://codecov.io/gh/louis-genestier/leboncoin-api-wrapper/branch/master/graph/badge.svg)](https://codecov.io/gh/louis-genestier/leboncoin-api-wrapper) [![CircleCI](https://circleci.com/gh/louis-genestier/leboncoin-api-wrapper.svg?style=svg)](https://circleci.com/gh/louis-genestier/leboncoin-api-wrapper)  

Leboncoin API wrapper goal is to make it easy to use the Leboncoin's API. (Still a WIP)  

## Installation

`npm i leboncoin-api-wrapper`

## Features 

* Search on Leboncoin.
* Get users phone number if available.

## Code Example

```javascript
const lbc = require('leboncoin-api-wrapper');

const finder = new lbc.Finder();
finder.setKeywords('Evangelion'); // We set the keywords that we want to search
finder.setCategory('livres'); // Setting the category, you can find the full on Leboncoin.fr
finder.setOrder('desc'); // desc or asc
finder.setPage(1);
finder.setLimit(10); // Limit per page

(async () => {
  const resp = await finder.search();
})();
```

## Documentation  

`setKeywords('evangelion')`  
Parameter: string  
Define the keywords you want to search

`setPage(1)`  
Parameter: integer  
Define the page number

`setOrder('desc')`  
Parameter: string  
Define the ads order `desc` or `asc`

`setLimit(15)`  
Parameter: integer  
Define the number of ads per page

`setCategory('livres')`  
Parameter: string  
Define the category, you can find a full list [here]('https://github.com/louis-genestier/leboncoin-api-wrapper/blob/master/enum/categories.enum.js')

`setMinPrice(15)`  
Parameter: integer  
Define the minimal price

`setMaxPrice(15)`  
Parameter: integer  
Define the maximal price

`setLocations([{'city': 'Montreuil','zipcode': '93100'}])`  
Parameter: array  
Define the cities, you can add as many as you want

`setMinRooms(2)`  
Parameter: integer  
Define the minimum number of rooms (for real estate)

`setMaxRooms(2)`  
Parameter: integer  
Define the maximum number of rooms (for real estate)

`setMinSquare(15)`  
Parameter: integer  
Define the minimal size in square meter

`setMaxSquare(15)`  
Parameter: integer  
Define the maximal size in square meter

`setEstateType(['maison'])`  
Parameter: array  
Define the kind of real estate you are looking for, full list [here](https://github.com/louis-genestier/leboncoin-api-wrapper/blob/master/enum/estateTypes.enum.js)

`setFurnished(true)`  
Parameter: boolean  
Define if the real estate is furnished or not (for locations` category)

`setSellType(['old'])`  
Parameter: array  
Define the real estate type, `old` `new` or `viager` (for `ventes immobilieres` category)`

`search()`  
Run the search and will returns corresponding ads with phone numbers if possible.
