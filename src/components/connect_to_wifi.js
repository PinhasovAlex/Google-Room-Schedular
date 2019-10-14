import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class ConnectToWifi extends Component {
  static propTypes = {
    onShowCalendars: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = { wifiArray: [],
                   isScanInProgress: true }

    this.wifi = require("node-wifi");
    this.wifi.init({
        iface: null // network interface, choose a random wifi interface if set to null
    });
                    

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
    let currentComponent = this;
  
    // Scan networks
    this.wifi.scan(function(err, networks) {
      if (err) {
        console.log(err);
      } else {

        var availableWifi = []
        networks.map((network, index) => { 
            availableWifi.push (network["ssid"]);
            console.log(network)
        })
        console.log(availableWifi)
        currentComponent.setState({ wifiArray: availableWifi, isScanInProgress: false })  
      }
    });   
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

  handleSelectedWifi(ssid) {
    window.location.hash = 'wifiAuth';
    //   this.wifi.connect({ ssid: ssid, password: "203796370" }, function(err) {
    //     if (err) {
    //       console.log(err);
    //     }
    //     console.log("Connected");
    //   });
  }

  showKeyboard() {

  }

  scrollToTimeLine(container) {
    if (container === null) {
      return;
    }
    container.scrollIntoView({behavior: 'instant'});
  }

  render() {
    const wifiArray = this.state.wifiArray;
    const isScanInProgress  = this.state.isScanInProgress;

    var availableWifi = [];
    wifiArray.forEach((ssid, index) => {
        availableWifi.push ((
          <div className="flex-container schedule-event" key={index}>
            <h2 className="calendar-name" onClick={() => this.handleSelectedWifi(ssid)}>{ssid}</h2>
          </div>
        ))
    });
    
    return (
      <ReactCSSTransitionGroup
        transitionName="fade"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <div className="flex-container schedule">
          <h3 className="schedule-header calendar">Available Wi-Fi connections</h3>
          <h4 className="calendar-message">{isScanInProgress ? "Scanning..." : "Done" }</h4>
          <div className="schedule-event-list">
              {availableWifi}
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}
