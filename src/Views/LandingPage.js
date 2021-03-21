import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { API, AppContext } from "../AppContext";
import axios from "axios";
import { FaRegClipboard, FaClipboardCheck } from 'react-icons/fa';

import Header from "../components/Header";

import "../Styling/LandingPage.css";
import Slideout from "../components/Slideout";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Landing page, first view that user interacts with.
 * @param {} props 
 */
function Landing(props) {
    const { state: contextState, dispatch } = useContext(AppContext);
    const [showLink, updateShowLink] = useState(false);
    const [name, updateName] = useState("");
    /* 
    Function That Executes When Generate Room Button Is Clicked
    Updates The Room Code, Display Name, and Sets The Show Link Boolean to True
    The Code and Display Name Will Be Sent Over To The Generate Component
    */
    function handleGenerateClick(e) {
        dispatch({ type: "update-name", displayName: name });
        API.requestRoom();
        updateShowLink(true);
    }
    return (
        <div>
            <Header roomKey={contextState.roomKey} />
            <div className="landing-page">
                <div className="landing-box">

                    <div className="create">
                        <h3>Create a Discussion Room</h3><br /><br />
                        <input type="text" id="displayName" className="form-control" aria-describedby="passwordHelpBlock" input placeholder="Enter Display Name" onChange={(e) => updateName(e.target.value)} /> <br />
                        <button type="button" className="btn btn-primary btn-lg generate-btn" onClick={handleGenerateClick}>Generate Room</button>
                    </div>
                    <div className="link-box">
                        {showLink ? <Slideout>
                            <div>
                                Link: <Link to={`/room/${contextState.roomKey}`}>{"https://localhost:3001/room/" + contextState.roomKey}</Link>
                                <Copy link={`https://localhost:3001/room/${contextState.roomKey}`} />
                            </div>
                        </Slideout> : <div></div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Copy button that disables itself once clicked.
 * @param {} props 
 */
function Copy(props) {
    const [clicked, setClicked] = useState(false);
    const doCopy = () => {
        navigator.clipboard.writeText(props.link);
        toast("Copied!");
        setClicked(true);
    }
    return <>
        <button onClick={doCopy} disabled={clicked} className={`copy-btn ${clicked && 'clicked'}`}>
            {clicked ? <FaClipboardCheck></FaClipboardCheck> :
                <FaRegClipboard></FaRegClipboard>}
        </button>
    </>
}


export default Landing;