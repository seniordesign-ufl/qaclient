import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";

//Components
import PostSummary from "../components/PostSummary"
import { socket } from "../service/socket";
import CreatePost from "../components/NewPost";

//Bootstrap
import { Button, Modal } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsPerson } from 'react-icons/bs';

import Header from '../components/Header';

function Room(props) {
    const { state: contextState, dispatch } = useContext(AppContext);
    const [numUsers, setNumUsers] = useState(0);
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        //Will be undefined on first load for everyone except creator of room
        if (contextState.displayName !== null) {
            dispatch({ type: "join-room", roomKey: props.match.params.roomID });
            socket.emit('join', { userName: contextState.displayName, groupID: props.match.params.roomID });
            socket.on('update-users', ({ names }) => {
                setNumUsers(names.length);
            });
            //Called when user leaves current page
            window.addEventListener("beforeunload", function (event) {
                socket.emit('leave', { userName: contextState.displayName, groupID: props.match.params.roomID });
                socket.off('update-users', ({}));
            })
            // unsubscribe from event for preventing memory leaks
            return () => {
                window.removeEventListener("beforeunload", function (event) {
                    socket.emit('leave', { userName: contextState.displayName, groupID: props.match.params.roomID });
                    socket.off('update-users', ({}));
                })
            };
        }
    }, [contextState.displayName]); //Rerun once name is added

    useEffect(() => {
        socket.on('update-posts', ({ posts, groupID }) => {
            dispatch({ type: 'update-posts', posts: posts })
            if (groupID === contextState.roomKey)
                handleClose();
            console.log(contextState.posts)
        });
        // unsubscribe from event for preventing memory leaks
        return () => {
            socket.off('update-posts');
        };
    }, []);

    function handleJoinClick() {
        dispatch({ type: "update-name", displayName: name });
    }

    function mapPosts() {
        if ((contextState.posts !== null && contextState.posts !== undefined) && contextState.posts.length !== 0) {
            return (
                contextState.posts.map((post, i) => (
                    <PostSummary post={post}></PostSummary>
                ))
            )
        }
        else {
            return (
                <p>No posts yet</p>
            )
        }
    }

    return (
        <div className="room-page">
            <Header roomKey={contextState.roomKey} />
            {contextState.displayName !== null ?
                <div>
                    <Container className="roomContainer">
                        <Row>
                            <Col sm={2} style={{ textAlign: 'left' }}>
                                <h2>Discussion</h2>
                            </Col>
                            <Col sm={1}>
                                <BsPerson />
                                <p>{numUsers}</p>
                            </Col>
                            <Col style={{ display: 'flex' }}>
                                <Button style={{ marginLeft: 'auto', marginBottom: '15px' }} variant="dark" onClick={handleShow}>New Post</Button>
                                {show ? <CreatePost show={show} onHide={() => setShow(false)} /> : null}
                            </Col>
                        </Row>
                        <Row>
                            {mapPosts()}
                        </Row>
                    </Container>
                </div>

                :

                <div className="create">
                    <input placeholder="Enter Display Name" onChange={(e) => setName(e.target.value)} /> <br />
                    <button onClick={handleJoinClick}>Join Room</button>
                </div>
            }
        </div>
    );
}

export default Room;