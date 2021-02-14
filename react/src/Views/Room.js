import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import { socket } from "../components/socket";

function Room(props) {
    const { state: contextState, dispatch } = useContext(AppContext);
    const [numUsers, setNumUsers] = useState(0);
    const [name, setName] = useState('');

    useEffect(() => {
        //Will be undefined on first load for everyone except creator of room
        if (contextState.displayName !== null)
        {
            socket.emit('join', {userName: contextState.displayName, groupID: props.match.params.roomID});
            socket.on('update-users', ({names}) => {
                setNumUsers(names.length);
            });
            //Called when user leaves current page
            window.addEventListener("beforeunload", function (event) {
                socket.emit('leave', {userName: contextState.displayName, groupID: props.match.params.roomID});
                socket.off('update-users', ({}));
            })
            // unsubscribe from event for preventing memory leaks
            return () => {
                window.removeEventListener("beforeunload", function (event) {
                    socket.emit('leave', {userName: contextState.displayName, groupID: props.match.params.roomID});
                    socket.off('update-users', ({}));
                })
            };
        }
    }, [contextState.displayName]); //Rerun once name is added

    function handleJoinClick() {
        dispatch({ type: "update-name", displayName: name });
    }

    return (
        <div className="room-page">
            {contextState.displayName !== null ?
                <p>{numUsers}</p> :

                <div className="create">
                    <input placeholder="Enter Display Name" onChange={(e) => setName(e.target.value)} /> <br />
                    <button onClick={handleJoinClick}>Join Room</button>
                </div>
            }
        </div>
    );
}

export default Room;