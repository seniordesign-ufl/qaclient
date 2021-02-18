import React, { useContext, useEffect, useState } from "react";
import { API, AppContext } from "../AppContext";

//Components
import PostSummary from "../components/PostSummary"
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
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        //Will be undefined on first load for everyone except creator of room
        if (contextState.displayName !== null) {
            dispatch({ type: "join-room", roomKey: props.match.params.roomID });
            API.join(contextState.displayName, props.match.params.roomID);
            //Called when user leaves current page
            window.addEventListener("beforeunload", function (event) {
                API.leave(contextState.displayName, props.match.params.roomID)
            })
            // unsubscribe from event for preventing memory leaks
            return () => {
                window.removeEventListener("beforeunload", function (event) {
                    API.leave(contextState.displayName, props.match.params.roomID)
                })
            };
        }
    }, [contextState.displayName]); //Rerun once name is added

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
                                <p>{contextState.users.length}</p>
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