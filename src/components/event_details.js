import React, { Component, PropTypes } from 'react';
import Button from './button';
import classNames from 'classnames';
import { isEmpty } from 'lodash/lang';
import EventDuration from './event_duration';
import { getCurrentWifi } from '../util';

export default class EventDetails extends Component {
  static props = {
    event: PropTypes.object,
    isCurrent: PropTypes.bool,
    expanded: PropTypes.bool,
    handleShowSchedule: PropTypes.func.isRequired,
    handleExpandDetails: PropTypes.func.isRequired,
  }

  static defaultProps = {
    expanded: false,
  };

  constructor(props) {
    super(props);
    this.wifiSignal = "wifi-not-connected"
    this.timer
    this.state = { wifiSignal: this.wifiSignal}
  }

  componentDidMount() {
    this.isClassMounted = true
    this.getCurrentWifiSignal()
  }

  componentWillUnmount() {
    this.isClassMounted = false
    clearInterval(this.timer);
  }

  handleExpandDetails() {
    this.props.handleExpandDetails();
  }

  attendees() {
    const { event } = this.props;
    if (!event.attendees) {
      return null;
    } else {
      return event.attendees.map((attendee, index) => {
        if (attendee.resource) {
          return null;
        }
        return (
          <li key={index}>{attendee.displayName || attendee.email}</li>
        );
      })
    }
  }

  getCurrentWifiSignal() {
    let ref = this
    this.timer = setInterval(() => {
      if (ref.isClassMounted == true) {
        getCurrentWifi().then(signal => { 
          ref.wifiSignal = signal == 1 ? "wifi-full" : (signal == 2 ? "wifi-medium" : ( signal == 3 ? "wifi-low" : "wifi-not-connected"))
          ref.setState({ wifiSignal: ref.wifiSignal })
          console.log(ref.wifiSignal)
      })
      }
    }, 2500);
  }

  handleShowChooseCalendar() {
    window.location.hash = 'calendarsAuth';
  }

  handleShowAvailableWiFi() {
    window.location.hash = 'connect_to_wifi';
  }

  render() {
    const { event, isCurrent, expanded } = this.props;
    const { wifiSignal } = this.state

    const expandbtnClasses = classNames({
      small: true,
      'expand-btn': true,
      expanded: expanded,
    });

    const calendarbtnClasses = classNames({
      small: true,
      'calendar-btn': true,
      expanded: expanded,
    });

    const wifibtnClasses = classNames({
      small: true,
      'wifi-btn': true,
      expanded: expanded,
    });
    
    if (isEmpty(event)) {
      return (
        <div className='event-details flex-container'>
        <Button icon="arrow-up" className={expandbtnClasses} handleClick={this.handleExpandDetails.bind(this)}/>
        <Button icon="calendar-settings" className={calendarbtnClasses} handleClick={this.handleShowChooseCalendar.bind(this)}/>
        <Button icon={wifiSignal} className={wifibtnClasses} handleClick={this.handleShowAvailableWiFi.bind(this)}/>
        <h3 className="event-details-status"></h3>
          <h3 className="event-details-status">
            {'NO UPCOMING EVENTS'}
          </h3>
        </div>
      );
    }

    return (
      <div className='event-details flex-container'>
        <Button icon="arrow-up" className={expandbtnClasses} handleClick={this.handleExpandDetails.bind(this)}/>
        <Button icon="calendar-settings" className={calendarbtnClasses} handleClick={this.handleShowChooseCalendar.bind(this)}/>
        <Button icon={wifiSignal} className={wifibtnClasses} handleClick={this.handleShowAvailableWiFi.bind(this)}/>
        <div className="flex-conatiner-hangout">
          <h3 className="event-details-status">
            {isCurrent ? 'CURRENT MEETING' : 'COMING UP'}
          </h3>
          <EventDuration event={event} />
        </div>
        <h3 className="event-details-name">{event.visibility == "private" ? "Private" : event.summary}</h3>
        <p className="event-details-creator">{event.creator.displayName || event.creator.email}</p>
        <div className="flex-conatiner-hangout">
          <div className="event-hangout-meet"></div>
          <p className="event-hangout-creator">{event.hangoutLink == null ? "None" : event.hangoutLink}</p>
        </div>
        <ul className="event-details-attendees">{this.attendees()}</ul>
      </div>
    );
  }
}
