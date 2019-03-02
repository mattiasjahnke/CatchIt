const chalk = require('chalk');
const log = console.log;
const moment = require('moment');
moment.locale('sv');

module.exports = {
  printDepartures: (stationName, departures) => {
    console.log(departures);
    console.log('\033[2J');

    if (departures === undefined || departures.length === 0) {
      log("No departure found");
      return;
    }

    log(
      chalk.bgBlue.white('┌' +
      ''.padEnd(53, '─') +
      '┐')
    );
    log(
      chalk.bgBlue.white('│  ' +
      stationName.padEnd(51) +
      '│')
    );
    log(
      chalk.bgBlue.white('├') +
      chalk.bgBlue.bold.yellow(''.padEnd(53, '─')) +
      chalk.bgBlue.white('┤')
    );

    departures.map(depature => {
      const departureTime = moment(depature.ExpectedDateTime);
      const minutesUntil = Math.round(moment.duration(departureTime.diff(moment())).asMinutes() * 2) / 2;

      if (minutesUntil < 0) {
        return;
      }

      log(
        chalk.bgBlack.white('│  ') +
        chalk.bgBlack.white.bold((depature.LineNumber + '  ').padEnd(5)) +
        chalk.bgBlack.white(depature.Destination.padEnd(33)) +
        chalk.bgBlack.white((minutesUntil + ' min ').padStart(13)) +
        chalk.bgBlack.white('│')
      );

      //log("Bus " + bus.LineNumber + " to " + bus.Destination +
      //    " departs in " + minutesUntil + " minutes (" + departureTime.format('LT') + ")");
    });

    log(
      chalk.bgBlack.white('└' +
      ''.padEnd(53, '─') +
      '┘')
    );
  }
};
