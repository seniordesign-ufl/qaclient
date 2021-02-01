import React, { useState } from "react";

import Generate from "./Generate";

function Landing (props) {

    this.state = {
        code: props.room,
        update_room_code: props.update_room,
        name: props.name,
        update_name: props.update_name,
        show_link: props.should_show_link,
        update_show_link: props.update_show_link
    }

      /* 
    Function That Executes When Generate Room Button Is Clicked
    Updates The Room Code, Display Name, and Sets The Show Link Boolean to True
    The Code and Display Name Will Be Sent Over To The Generate Component
    */
    function handleGenerateClick (e) {
        this.state.update_room_code();
        this.state.update_name(this.state.name);
        this.state.update_show_link(true);
    }

    const updateUserName = (e) => {
        this.state.update_name(e.target.value);
    }

    return (
        <div className="landing-page">
            <div className="create-">
                <input placeholder="Enter Display Name" onChange={updateUserName} />
                <button onClick={handleGenerateClick}>Generate Room</button>
            </div>
            {this.state.showLink ? <Generate /> : null}
        </div>
    );
}

export default Landing;