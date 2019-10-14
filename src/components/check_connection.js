import React, { Component, PropTypes } from 'react';
import { ipcRenderer } from 'electron';

export default class CheckConnection extends Component {

  onsWifiClick() {
    window.location.hash = 'connect_to_wifi';
  }

  onRetryFetchClick() {
    ipcRenderer.send('calendar:list-events');
  }

  render() {
    return (
      <div className="no-connection">
        <img src="public/images/selina_logo.png" width='50%'></img>
        <div className="icon"><i className="icon icon-no-connection"></i></div>
        <div className="row">
          <div className="wide-button" onClick={() => this.onWifisClick()}>
            <h3 className="center">Connect to Wi-Fi</h3>
          </div>
          <div className="wide-button" onClick={() => this.onRetryFetchClick()}>
            <h3 className="center">Try agian</h3>
          </div>
        </div>
        <h3 className="text">Failed to connect to the Google Calendar API</h3>
      </div>
    )
  }
}
