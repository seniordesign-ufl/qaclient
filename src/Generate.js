import React, { Component } from "react";

class Generate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            room_code: this.props.room,
            name: this.props.name
        };
    }

    render() {
        return (
            <div className="generate-class">
                <h1>
                    Hi! {this.state.name}
                </h1>
                <p>
                    Room Code: {this.state.room_code}
                </p>
            </div>
        );
    }
}

export default Generate;
  