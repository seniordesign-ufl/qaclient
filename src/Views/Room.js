import { React, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AppContext } from "../AppContext";
import { socket } from "../components/socket";

function Room(props) {
    const { state, dispatch } = useContext(AppContext);
    const { roomKey } = useParams();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        socket.emit("join", { userName: state.displayName, groupID: roomKey });
        socket.on('update-users', (r) => {
            const { names } = r;
            setUsers(names);
        });
        // unsubscribe from event for preventing memory leaks
        return () => {
            socket.off('update-users');
        };
    }, [state.roomKey])
    return <div>
        Users: {users.map((name, i) => <p key={i} >{name}</p>)}
        <input></input>
    </div>
}

export default Room;