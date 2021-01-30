import React, { Component } from "react";
import axios from "axios";

function componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
        console.log(res);
    });
}

// Returns A Greeting and The Room Code That Is Generated
function Generate (props) {
    return (
        <div className="generate-class">
            <h1>
                Hi! {props.name}
            </h1>
            <div>
                Room Code: {props.room} 
            </div>
            <button onClick={componentDidMount}>Click HERE!</button>
        </div>
    );
}

export default Generate;
  