import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { writeConfiguration, readConfigurationFile } from '../util';

export default class Calendars extends Component {
  static propTypes = {
    onShowCalendars: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = { calendars: [],
                  selected_id: "" }
    // db.collection('')
    // .get()
    // .then( snapshot => {
    //   console.log(snapshot)
    // }).catch( error => console.log(error))
    }

  scrollTimeLineIntoView() {
    this.refs.timeLinePosition.scrollIntoView({behavior: 'instant'});
  }

  componentDidMount() {
    if (this.refs.timeLinePosition) {
      this.scrollTimeLineIntoView();
    }
  }

  componentWillMount() {
    var dictionary = [];
    var tlv = []
    var panama = []

    tlv.push ({
      key: "Pedasi",
      value: "Pedasi"
      });
    tlv.push ({
      key: "Miami",
      value: "Miami"
      });

    panama.push ({
      key: "Kalu Yala",
      value: "Kalu Yala"
      });
    panama.push ({
      key: "Porto",
      value: "Porto"
      });  

      dictionary.push({
      key: "Tel-Aviv",
      value: tlv
      });

      dictionary.push({
      key: "Panama",
      value: panama
      });
      readConfigurationFile()
      .then(configuration => { 
        this.setState({calendars: dictionary ,selected_id: configuration.calendar_id})  
      })
  }

  componentDidUpdate() {
    if (this.refs.timeLinePosition) {
      this.scrollTimeLineIntoView();
    }
  }

  timeLine() {
    return (
      <span className="time-line"></span>
    );
  }

  handleSelectedCalendar(id,name) {
      writeConfiguration(id,name)
      this.setState({ selected_id: id })
  }

  scrollToTimeLine(container) {
    if (container === null) {
      return;
    }
    container.scrollIntoView({behavior: 'instant'});
  }

  render() {
    const calendars = this.state.calendars;
    const selected_id = this.state.selected_id;
    const allLocationsCalendars = []
    calendars.forEach((country, index) => {
      var countryAvailableCalendars = country.value.map((calendar, index) => {
        var isLastElement = (index == country.value.length-1)
        var lastCalendarElement = selected_id == calendar.value ? "calendar-name last selected" : "calendar-name last"
        var anyCalendarElement = selected_id == calendar.value ? "calendar-name selected" : "calendar-name"
        var calendarClassName =  isLastElement ? lastCalendarElement : anyCalendarElement 
        return (
          <div className="flex-container schedule-event" key={index}>
            <h2 className={calendarClassName} onClick={() => this.handleSelectedCalendar(calendar.value, calendar.key)}>{calendar.key}</h2>
          </div>
        )
      });
      var countryName = (<div key={index}>
                           <h3 className="calendar-country">{country.key}</h3>
                         </div>)
      allLocationsCalendars.push(countryName)
      allLocationsCalendars.push(countryAvailableCalendars)
    });
    
    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <div className="flex-container schedule">
          <h3 className="schedule-header calendar">Calendars</h3>
          <h4 className="calendar-message">Restart the device after selection to apply changes</h4>
          <div className="schedule-event-list">
            <div className="flex-container">
              {allLocationsCalendars}
            </div>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}
