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
