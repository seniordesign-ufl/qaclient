  
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import { socket } from "../components/socket";

// Returns A Greeting and The Room Code That Is Generated
function Generate(props) {

    const { state: contextState, dispatch } = useContext(AppContext);

    return (
        <div className="generate-class">
            <div>
                Room Link: <Link to={"/room/" + contextState.roomKey}>{console.log(contextState)}{"https://localhost:3001/room/" + contextState.roomKey}</Link>
            </div>
        </div>
    );
}

export default Generate;
