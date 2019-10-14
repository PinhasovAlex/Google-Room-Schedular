import humanizeDuration from 'humanize-duration';

const fs = require('fs');
const path = require('path');
const CONFIG_DIR = path.resolve(__dirname, '/Users/alexpinhasov/SelinaRooms/config/');
const SITINCATOR_CONFIG = path.resolve(CONFIG_DIR, 'sitincator.json');

export const nextEvent = (events) => {
  const now = new Date().getTime();

  const sortedEvents = events.sort(function(a, b) {
    return new Date(a.start.dateTime).getTime() - new Date(b.start.dateTime).getTime();
  });

  const futureEvents = sortedEvents.filter(function(event) {
    return new Date(event.start.dateTime).getTime() > now;
  });

  return futureEvents[0] || {};
};

export const nextEventIdx = (events) => {
  const nextEvent = exports.nextEvent(events);

  return events.indexOf(nextEvent);
};

export const currentEvent = (events) => {
  const now = new Date().getTime();

  const currentEvents = events.filter(function(event) {
    const eventStart = new Date(event.start.dateTime).getTime();
    const eventEnd = new Date(event.end.dateTime).getTime();

    return eventStart <= now && eventEnd >= now;
  });

  return currentEvents[0] || {};
};

export const timeToEvent = (event) => {
  return (Date.parse(event.start.dateTime) - Date.now());
};

export const timeLeft = (event) => {
  return Date.parse(event.end.dateTime) - Date.now();
};

export const humanReadableDuration = (ms) => {
  // largest: max number of units to display, round: round to smallest unit displayed
  return humanizeDuration(ms, { largest: 1, round: true, units: ['d', 'h', 'm'] });
};

export const isCurrent = (event) => {
  return timeToEvent(event) <= 0 && timeLeft(event) >= 0;
};

export const isBeforeNow = (event) => {
  return timeLeft(event) < 0;
};

export const isAfterNow = (event) => {
  return timeToEvent(event) > 0;
};

export const isAllDayEvent = (event) => {
  return event.isAllDay;
};



export const writeConfiguration = (calendar_id, calendar_name) => {
  return new Promise((resolve, reject) => {
    let configuration = { calendar_id: calendar_id, title: calendar_name };

    fs.writeFile(SITINCATOR_CONFIG, JSON.stringify(configuration), error => {
      if(error)
        reject(error);
      else
        resolve(configuration);
    });
  });
}

export function readConfigurationFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(SITINCATOR_CONFIG, (error, content) => {
      if (error)
        reject(error);
      else
        resolve(JSON.parse(content));
    });
  });
}

const wifi = require("node-wifi");
wifi.init({
    iface: null // network interface, choose a random wifi interface if set to null
});

export function getCurrentWifi() {
  return new Promise((resolve, reject) => { 
    wifi.getCurrentConnections(function(err, currentConnections) {
      if (err) {
        console.log(err);
        reject(err)
      }
      var signal_level = currentConnections[0]["signal_level"]
  
       if (signal_level <= 0 && signal_level > -67) {
         resolve(1)
      } else if (signal_level <= -67 && signal_level >= -70) { 
        resolve(2)
      } else if (signal_level < -70 && signal_level >= -80) {
        resolve(3)
      } else {
        resolve(4)
      }
    });
  })
}
