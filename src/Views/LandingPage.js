import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AppContext } from "../AppContext";
import { socket } from "../components/socket";
import "../Styling/LandingPage.css";
import Header from "../components/Header.js";

function Landing(props) {
    const [name, updateName] = useState("");

    /* 
    Function That Executes When Generate Room Button Is Clicked
    Updates The Room Code, Display Name, and Sets The Show Link Boolean to True
    The Code and Display Name Will Be Sent Over To The Generate Component
    */
    const history = useHistory()
    useEffect(() => {
        socket.on("room-code", (roomKey) => {
            appContext.dispatch({ type: "join-room", roomKey });
            history.push(`/room/${roomKey}`);
        })
        return () => socket.off('room-code');
    });
    const appContext = useContext(AppContext);
    function handleGenerateClick(e) {
        appContext.dispatch({ type: "update-name", displayName: name });
        socket.emit("request-room")
    }

    return (
        <div>
            <Header></Header>
            <div className="landing-page">
                <div className="create">
                    <h3>Create a Discussion Room</h3><br /><br />
                    <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" input placeholder="Enter Display Name" onChange={(e) => updateName(e.target.value)} /> <br />
                    <button type="button" class="btn btn-primary btn-lg" onClick={handleGenerateClick}>Generate Room</button>
                </div>
            </div>
        </div>
    );
}

export default Landing;