import { React, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AppContext } from "../AppContext";
import { socket } from "../components/socket";

import CreatePost from "../components/NewPost";
import Header from "../components/Header";

import { Button, Modal } from "react-bootstrap";

function Room(props) {
    const { state: contextState, dispatch } = useContext(AppContext);
    const { roomKey } = useParams();
    const [users, setUsers] = useState([]);
    // const [show, setShow] = useState(false)

    // const handleModalClose = () => setShow(false);
    // const handleModalOpen = () => {
    //     setShow(true);
    //     console.log(show);
    // }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        socket.emit("join", { userName: contextState.displayName, groupID: roomKey });
        socket.on('update-users', (r) => {
            const { names } = r;
            setUsers(names);
        });
        // unsubscribe from event for preventing memory leaks
        return () => {
            socket.off('update-users');
        };
    }, [contextState.roomKey])

    return <div>
        <Header />
        Users: {users.map((name, i) => <p key={i} >{name}</p>)}
        <input />
        <Button variant="dark" onClick={handleShow}>+ Start New Discussion</Button>
        {show ? <CreatePost show={show} onHide={() => setShow(false)} />: null}
    </div>
}

export default Room;