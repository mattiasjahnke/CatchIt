'use strict';

const e = React.createElement;

class DepartureTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departures: [],
      location: ''
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.updateState();
    }, 1000 * 10);

    this.updateState();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateState() {
    this.callApi()
      .then(res => this.setState({ departures: res.departures, location: res.location }))
      .catch(err => console.log(err));
  }

  async callApi() {
    const response = await fetch('/api/fetch');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    const rows = this.state.departures.map(departure => {
      const departureTime = moment(departure.ExpectedDateTime);
      const minutesUntil = Math.round(moment.duration(departureTime.diff(moment())).asMinutes() * 2) / 2;

      if (minutesUntil < 0) {
        return;
      }

      return e('tr', null,
        e('td', { className: 'column-first' }, departure.LineNumber),
        e('td', { className: 'column-mid' }, departure.Destination),
        e('td', { className: 'column-last' }, minutesUntil + ' min')
      );
    });

    return e('table', {width: '100%'},
      e('thead', {className: 'table100-head'},
        e('tr', null,
          e('th', {colSpan: 3 }, this.state.location)
        ),
      ),
      e('tbody', null,

        rows
      )
    );
  }
}

const domContainer = document.querySelector('#departures');
ReactDOM.render(e(DepartureTable), domContainer);
