import React, { useState } from "react";

import Generate from "./Generate";

function Landing (props) {

    //props.room
    //props.update_room
    //props.name
    //props.update_name
    //props.should_show_link
    //props.update_show_link

    /* 
    Function That Executes When Generate Room Button Is Clicked
    Updates The Room Code, Display Name, and Sets The Show Link Boolean to True
    The Code and Display Name Will Be Sent Over To The Generate Component
    */
    function handleGenerateClick (e) {
        props.update_room(props.room);
        props.update_name(props.name);
        props.update_show_link(true);
    }

    const updateUserName = (e) => {
        props.update_name(e.target.value);
    }

    return (
        <div className="landing-page">
            <div className="create">
                <input placeholder="Enter Display Name" onChange={updateUserName} /> <br />
                <button onClick={handleGenerateClick}>Generate Room</button>
            </div>
            {props.should_show_link ? <Generate name={props.name} room={props.room} /> : null}
        </div>
    );
}

export default Landing;