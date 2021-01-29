import React, { Component } from "react";

// Returns A Greeting and The Room Code That Is Generated
function Generate (props) {
    return (
        <div className="generate-class">
            <h1>
                Hi! {props.name}
            </h1>
            <p>
                Room Code: {props.room}
            </p>
        </div>
    );
}

export default Generate;
  