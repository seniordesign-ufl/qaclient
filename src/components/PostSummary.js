import React, { useContext, useState } from "react";
import { API, AppContext } from "../AppContext";

//Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { BsChevronUp } from 'react-icons/bs'
import { BsChatSquareDots } from 'react-icons/bs'

function PostSummary(props) {
    const [canUpvote, setCanUpvote] = useState(true)
    const [show, setShow] = useState(false);
    const { state: contextState, dispatch } = useContext(AppContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleUpvote() {
        if (!contextState.upVotes.includes(props.post.id)) {
            const postUpdate = {
                postID: props.post.id,
                upVote: 1,
            }
            API.updatePost(postUpdate, contextState.roomKey);
            dispatch({type: 'update-upVotes', upVotes: contextState.upVotes.concat([props.post.id])})
        }
    }

    function handleRemove() {
        API.removePost(props.post.id, contextState.roomKey);
    }

    function calculateTime() {
        let diff = (new Date()).getTime() - new Date(props.post.time).getTime();
        return (Math.round(diff / 60000))
    }

    function handleComment() {
        props.select(contextState.posts.findIndex((element) => element.title === props.post.title));
        props.display(true);
    }

    return (
        <div className='postSummary'>
            <Card style={{ width: '100%' }}>
                <Container>
                    <Row>
                        <Col sm='1'>
                            <Button variant='light' onClick={() => handleUpvote()} style={{ marginTop: '10px' }}><BsChevronUp /></Button>
                            <br />
                            <a>{props.post.upVotes}</a>
                            <br />
                            <Button variant='light' onClick={() => handleComment()} style={{ marginTop: '10px' }}><BsChatSquareDots /></Button>
                            <br />
                            <a>{props.post.comments.length}</a>
                        </Col>
                        <Col lg style={{ textAlign: 'left' }}>
                            <Row>
                                <Col>
                                    <Card.Title>{props.post.title}</Card.Title>
                                </Col>

                                {/* Check if current display name matches name of post. If so allow them to remove it */
                                    contextState.displayName === props.post.author &&
                                    <Col sm={1}>
                                        <Button onClick={handleShow} variant="outline-danger" style={{ marginTop: '10px' }}>X</Button>
                                    </Col>
                                }
                            </Row>
                            <Card.Text>{props.post.content}</Card.Text>
                            <blockquote>
                                <Row>
                                    <Col>
                                        <footer className="blockquote-footer">
                                            {props.post.isAnon ? 'Anonymous' : props.post.author}
                                        </footer>
                                    </Col>
                                    <Col sm={2}>
                                        <p className='postTime'>{calculateTime()} mins ago</p>
                                    </Col>
                                </Row>
                            </blockquote>
                        </Col>
                    </Row>
                </Container>
            </Card>
            {/* Confirmation for Removing Post */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove this post?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => { handleRemove(); handleClose() }}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default PostSummary;