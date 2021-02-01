import React, { Component } from "react";
import axios from "axios";

// Returns A Greeting and The Room Code That Is Generated
function Generate (props) {
    
    function componentDidMount() {
        axios.get(`http://localhost:3000/room/${props.room}/${props.name}/join`).then(res => {
            console.log(res);
        });
    }

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
  