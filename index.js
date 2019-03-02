const fetcher = require('./src/fetcher');
const terminalSign = require('./src/terminal-sign');
const filters = require('./src/filters');

const sourceLocationObject = JSON.parse(process.env.SOURCE_LOCATION);

const updateTerminalSign = () => {
  terminalSign.printDepartures(sourceLocationObject.name, this.departures)
};

const updateInfo = () => {
  fetcher.fetchInfo()
    .then(filters.lineNumbers(['4']))
    .then(filters.sortByDepartureTime())
    .then(b => this.departures = b)
    .then(updateTerminalSign);
};

setInterval(updateTerminalSign, 10*1000);
setInterval(updateInfo, 1000*60*3);

updateInfo();
