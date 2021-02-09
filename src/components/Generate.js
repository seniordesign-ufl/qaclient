import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import { socket } from "../components/socket";

// Returns A Greeting and The Room Code That Is Generated
function Generate(props) {

    useEffect(() => {
        socket.on('update-users', ({names}) => {
            console.log(names);
        });
        // unsubscribe from event for preventing memory leaks
        return () => {
           socket.off('update-users', ({}));
           console.log("socket off");
        };
     }, []);

    const { state: contextState, dispatch } = useContext(AppContext);
    
    function AddToRoom() {
        /*axios.get(`http://localhost:3000/room/${props.room}/${props.name}/join`).then(res => {
            console.log(res);
        });*/
        socket.emit('join', {userName: contextState.displayName.toString(), groupID: "testRoom"})
    }

    return (
        <div className="generate-class">
            <h1>
                Hi! {contextState.displayName}
            </h1>
            <div>
                Room Code: <button onClick={AddToRoom}>{"test room"}</button>
            </div>
        </div>
    );
}

export default Generate;
