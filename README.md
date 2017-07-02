# Sitincator

![Sitincator](https://github.com/simplificator/sitincator/raw/gh-pages/images/sitincator.png)

"Sitincator" is [Simplificator's](https://www.simplificator.com) meeting room display system. It consists of a React/Electron app running on a Raspberry Pi 3, which is connected to a touch screen display.

The system shows the current occupancy of the meeting room on the display, all meetings of the current day and allows to make a reservation for 15 or 30 minutes. Sitincator reads the meeting information from Google Calendar.

## Hardware

Required components for the displays:

- Original Raspberry Pi touch screen 7”, https://www.pi-shop.ch/raspberry-pi-7-touch-screen-display-mit-10-finger-capacitive-touch
- Raspberry Pi 3, https://www.pi-shop.ch/raspberry-pi-3
- Display case for the Raspberry Pi and its touchscreen, https://www.pi-shop.ch/raspberry-pi-7-touchscreen-display-frame-noir

## Software

### Development Setup

It is not recommended to run the following setup on a Raspberry Pi. The installation of the correct node version and the required npm packages is quite a burden for the Raspberry Pi and takes a long time to complete, if successful. The setup has been tested on recent versions of OS X.

Node requirement: `v6`

    git clone git://github.com/simplificator/sitincator.git
    cd sitincator
    npm install
    mkdir {config,credentials}

- Follow [Google's guide][1] to obtain the OAuth JSON file and store it in `config/client_secret.json`.
- Start it: `npm start`
- Open the link printed in your terminal, login with the same user as before to obtain the OAuth JSON file and authorize the app to access the Google's API. You now get a token in the browser. Enter that token in the terminal's prompt.
- Tell Sitincator which calendar to use (the calendar ID can be found on the settings page of your calendar in Google Calendar): open `config/sitincator.js` and add the calendar ID as a value of `calendar_id`.
- Start webpack (note that this process is blocking, you could also start it in the background): `npm run watch`
- Start the application again: `npm start`

### Installation on the Raspberry Pi

It is recommended to build the package for the Raspberry Pi on a x86 machine:

    git clone git://github.com/simplificator/sitincator.git
    cd sitincator
    npm install
    npm run build:pi

The package for the Raspberry Pi now resides in `./Sitincator-linux-armv7l`. You can launch the app by copying the directory to your Raspberry Pi 3 and calling `./Sitincator-linux-armv7l/Sitincator`.

Note that you need to configure `config` and `credentials` as outlined in `Development Setup`.

[1]: https://developers.google.com/google-apps/calendar/quickstart/nodejs#step_1_turn_on_the_api_name

