import React, { Component } from "react";
import Keyboard from "react-simple-keyboard";
//import "react-simple-keyboard/build/css/index.css";
import "../../static/sass/modules/CalendarsAuth.scss";

export default class CalendarsAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layoutName: "default",
            input: ""
          };
    }

    onChange = input => {
        this.setState({
        input: input
        });
        console.log("Input changed", input);
        if (input == "123") {
            window.location.hash = 'calendars';
        }
    };

    onKeyPress = button => {
        console.log("Button pressed", button);

        /**
         * If you want to handle the shift and caps lock buttons
         */
        if (button === "{shift}" || button === "{lock}") this.handleShift();
    };

    handleShift = () => {
        let layoutName = this.state.layoutName;

        this.setState({
        layoutName: layoutName === "default" ? "shift" : "default"
        });
    };

    onChangeInput = event => {
        let input = event.target.value;
        this.setState(
        {
            input: input
        },
        () => {
            this.keyboard.setInput(input);
        }
        );
    };

    render() {
        return (
        <div>
            <input
            value={this.state.input}
            placeholder={"Enter Password"}
            onChange={e => this.onChangeInput(e)}
            />
            <Keyboard
            keyboardRef={r => (this.keyboard = r)}
            layoutName={this.state.layoutName}
            onChange={input => this.onChange(input)}
            onKeyPress={button => this.onKeyPress(button)}
            />
        </div>
        );
    }
}
