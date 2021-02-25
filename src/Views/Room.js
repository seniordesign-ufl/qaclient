import React, { useContext } from "react";
import { API, AppContext } from "../AppContext";

//Components

import Header from '../components/Header';
import EnterDisplayName from "./EnterDisplayName";
import RoomHomeScreen from "./RoomHomeScreen";

function Room(props) {
    const { state: contextState } = useContext(AppContext);
    return (
        <div className="room-page">
            <Header roomKey={contextState.roomKey} />
            {contextState.displayName !== null ?
                <RoomHomeScreen /> : <EnterDisplayName {...props} />}
        </div>
    );
}

export default Room;
