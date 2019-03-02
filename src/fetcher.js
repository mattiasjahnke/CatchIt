const path = require('path');
const fetchJson = require('fetch-json');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const siteLookupApiKey = process.env.REALTIME_INFO_API_KEY;
if (siteLookupApiKey === undefined) {
  console.log('Ingen API-nyckel konfigurerad!');
  console.log('Kontrollera att REALTIME_INFO_API_KEY=<din nyckel> finns i filen .env');
  return;
}

const sourceLocationObject = JSON.parse(process.env.SOURCE_LOCATION);
if (sourceLocationObject.id === undefined || sourceLocationObject.name === undefined) {
  console.log('Du har inte konfigurerat din hållplats!');
  console.log('Kontrollera att SOURCE_LOCATION=<din hållplats id> finns i filen .env\nKör "node wizard.js"!');
  return;
}

const destinationName = process.env.DESTINATION;
/*
if (destinationName === undefined) {
  console.log('Du har inte konfigurerat destination!');
  console.log('Kontrollera att DESTINATION=<namn på linjens ändhållplats> finns i filen .env');
  return;
}*/

const apiParameters = { key: siteLookupApiKey,
                        siteid: sourceLocationObject.id,
                        timewindow: '15',
                        bus: true,
                        metro: true,
                        train: true,
                        tram: true,
                        ship: true };

module.exports = {
  fetchInfo: () => {
    return fetchJson.get('http://api.sl.se/api2/realtimedeparturesV4.json', apiParameters)
      .then(response => {
        const data = response.ResponseData;
        return [].concat(data.Buses, data.Metros, data.Trains, data.Trams, data.Ships);
      });
  }
};
