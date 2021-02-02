import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import axios from "axios";

import Generate from "../components/Generate";

function Landing(props) {
    const [showLink, updateShowLink] = useState(false);
    const [name, updateName] = useState("");
    // const [shareableLink, updateShareableLink] = useState("http://localhost:3000/room/");

    /* 
    Function That Executes When Generate Room Button Is Clicked
    Updates The Room Code, Display Name, and Sets The Show Link Boolean to True
    The Code and Display Name Will Be Sent Over To The Generate Component
    */
    const appContext = useContext(AppContext);
    function handleGenerateClick(e) {
        appContext.dispatch({ type: "update-name", displayName: name });
        updateShowLink(true);
        // axios.get(`http://localhost:3000/request-room`).then(res => {
        //     console.log(res);
        //     updateShareableLink(shareableLink + res);
        // });
    }

    return (
        <div className="landing-page">
            <div className="create">
                <input placeholder="Enter Display Name" onChange={(e) => updateName(e.target.value)} /> <br />
                <button onClick={handleGenerateClick}>Generate Room</button>
            </div>
            {showLink ? <Generate name={name} /> : null}
        </div>
    );
}

export default Landing;