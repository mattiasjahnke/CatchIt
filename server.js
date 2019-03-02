require('dotenv').config();
const express = require('express');
const fetcher = require('./src/fetcher');
const filters = require('./src/filters');

const app = express();

const sourceLocationObject = JSON.parse(process.env.SOURCE_LOCATION);

// Routes
app.use(express.static('./src/public'));

app.get('/api/fetch', (req, res) => {
  if (this.departures !== undefined) {
    res.send({departures: this.departures, location: sourceLocationObject.name});
    return;
  }

  fetcher.fetchInfo()
    .then(filters.lineNumbers(['4']))
    .then(filters.sortByDepartureTime())
    .then(b => this.departures = b)
    .then(b => {
      res.send({departures: this.departures, location: sourceLocationObject.name});
    });
});

const resetData = () => this.departures = undefined;

// Start
setInterval(resetData, 1000*60*3);
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}!`));
