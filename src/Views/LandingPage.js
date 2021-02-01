import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";

import Generate from "../components/Generate";

function Landing(props) {
    const [showLink, updateShowLink] = useState(false);
    const [name, updateName] = useState("");

    /* 
    Function That Executes When Generate Room Button Is Clicked
    Updates The Room Code, Display Name, and Sets The Show Link Boolean to True
    The Code and Display Name Will Be Sent Over To The Generate Component
    */
    const appContext = useContext(AppContext);
    function handleGenerateClick(e) {
        appContext.dispatch({ type: "update-name", displayName: name });
        updateShowLink(true);
    }

    return (
        <div className="landing-page">
            <div className="create">
                <input placeholder="Enter Display Name" onChange={(e) => updateName(e.target.value)} /> <br />
                <button onClick={handleGenerateClick}>Generate Room</button>
            </div>
            {showLink ? <Generate /> : null}
        </div>
    );
}

export default Landing;