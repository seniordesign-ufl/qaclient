import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";

// Returns A Greeting and The Room Code That Is Generated
function Generate(props) {

    const { state: contextState, dispatch } = useContext(AppContext);
    function AddToRoom() {
        axios.get(`http://localhost:3000/room/${props.room}/${props.name}/join`).then(res => {
            console.log(res);
        });
    }

    return (
        <div className="generate-class">
            <h1>
                Hi! {contextState.name}
            </h1>
            <div>
                {/* Room Code: <Link onClick={AddToRoom}>{props.room}</Link> */}
            </div>
        </div>
    );
}

export default Generate;
