const fetchJson = require('fetch-json');
require('dotenv').config();
const readlineSync = require('readline-sync');
const fs = require('fs');

// Check config setup
const siteLookupApiKey = process.env.SITE_LOOKUP_API_KEY
if (siteLookupApiKey === undefined) {
  console.log('Ingen API-nyckel konfigurerad!');
  console.log('Kontrollera att SITE_LOOKUP_API_KEY=<din nyckel> finns i filen .env');
  return;
}

const searchString = readlineSync.question('Vilken hållplats befinner du dig på?\n> ');

console.log('Söker efter "' + searchString + '"...');

const apiParameters = {
  key: siteLookupApiKey,
  searchstring: searchString,
  stationsonly: true,
  maxresults: 5
};

fetchJson.get('https://api.sl.se/api2/typeahead.json', apiParameters)
  .then(response => {
    const results = response.ResponseData;
    switch (results.length) {
      case 0:
        console.log('Hittade inga hållplatser som matchade "' + searchString + '"');
        return undefined;
      case 1:
        return results[0];
      default:
        return results[readlineSync.keyInSelect(results.map(r=>r.Name), 'Vilken hållplats?')];
    }
  }).then(sourceLocation => {
    if (sourceLocation == undefined) { return; }
    console.log("Konfigurerar " +  sourceLocation.Name + ' som din hållplats i filen .env');
    fs.appendFileSync('.env', 'SOURCE_LOCATION={"name":"' + sourceLocation.Name + '", "id":' + sourceLocation.SiteId + "}");
  });
