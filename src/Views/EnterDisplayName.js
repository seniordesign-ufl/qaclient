import { React, useContext, useEffect, useState } from "react";
import { API, AppContext } from "../AppContext";
export default function EnterDisplayName(props) {
    const { state: contextState, dispatch } = useContext(AppContext);
    const [name, setName] = useState('');
    console.log(props);
    function handleJoinClick() {
        API.join(contextState.displayName, props.match.params.roomID);
        dispatch({ type: "update-name", displayName: name });
    }
    return (
        <div className="create">
            <input placeholder="Enter Display Name" onChange={(e) => setName(e.target.value)} /> <br />
            <button onClick={handleJoinClick}>Join Room</button>
        </div>
    );
}