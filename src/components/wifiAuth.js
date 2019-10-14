import React, { Component } from "react";
import Keyboard from "react-simple-keyboard";
import "../../static/sass/modules/CalendarsAuth.scss";

export default class WifiAuth extends Component {
    constructor(props) {
        super(props);
    }

    onChange = input => {
        const { ssid } = this.props;
        console.log(ssid,"alex")
        this.setState({
        input: input
        });
        console.log("Input changed", input);
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
