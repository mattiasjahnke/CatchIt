require('dotenv').config();
const moment = require('moment');

module.exports = {
  onlyBuses: () => {
    return data => {
      return data.filter(ride => ride.TransportMode === 'BUS');
    }
  },
  onlyMetros: () => {
    return data => {
      return data.filter(ride => ride.TransportMode === 'METRO');
    }
  },
  onlyTrains: () => {
    return data => {
      return data.filter(ride => ride.TransportMode === 'TRAIN');
    }
  },
  onlyTrams: () => {
    return data => {
      return data.filter(ride => ride.TransportMode === 'TRAM');
    }
  },
  onlyShips: () => {
    return data => {
      return data.filter(ride => ride.TransportMode === 'SHIP');
    }
  },
  lineNumbers: (lineNumbers) => {
    return data => {
      return data.filter(ride => lineNumbers.includes(ride.LineNumber));
    }
  },
  destination: (destination) => {
    return data => {
      return data.filter(ride => ride.Destination === destination);
    }
  },
  sortByDepartureTime: () => {
    return data => {
      return data.sort((a, b) => moment(a.ExpectedDateTime).diff(moment(b.ExpectedDateTime)));
    }
  }
};
