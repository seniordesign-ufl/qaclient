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

function Comment(props) {
    const [canUpvote, setCanUpvote] = useState(true)
    const [show, setShow] = useState(false);
    const { state: contextState, dispatch } = useContext(AppContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleUpvote() {
        if (canUpvote) {
            const commentUpdate = {
                title: props.title,
                commentID: props.comment.id,
                upVote: 1,
            }
            API.updateComment(commentUpdate, contextState.roomKey);
            setCanUpvote(false);
        }
    }

    function handleRemove() {
        const removeComment = {
            title: props.title,
            commentID: props.comment.id
        }
        API.removeComment(removeComment,  contextState.roomKey);
    }

    function calculateTime() {
        let diff = (new Date()).getTime() - new Date(props.comment.time).getTime();
        return (Math.round(diff / 60000))
    }

    return (
        <div class='comment'>
            <Card style={{ width: '100%' }}>
                <Container>
                    <Row>
                        <Col sm='1'>
                            <Button variant='light' onClick={() => handleUpvote()} style={{ marginTop: '10px' }}><BsChevronUp /></Button>
                            <br />
                            <a>{props.comment.upVotes}</a>
                        </Col>
                        <Col lg style={{ textAlign: 'left' }}>
                            <Row>
                                <Col>
                                    <Row>
                                        <Card.Text>{props.comment.content}</Card.Text>
                                    </Row>
                                    <Row style={{marginTop: "10px"}}>
                                        <blockquote>
                                            <footer className="blockquote-footer">
                                                {props.comment.isAnon ? 'Anonymous' : props.comment.author}
                                            </footer>
                                        </blockquote>
                                    </Row>
                                </Col>
                                {/* Check if current display name matches name of post. If so allow them to remove it */
                                contextState.displayName === props.comment.author &&
                                <Col sm={1}>
                                    <Button onClick={() => handleShow()} variant="outline-danger" style={{ marginTop: '10px' }}>X</Button>
                                </Col> 
                                }
                            </Row>
                            <Row>
                                <Col>
                                </Col>
                                <Col sm={2}>
                                    <p class='postTime'>{calculateTime()} mins ago</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Card>
            {/* Confirmation for Removing Post */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove this comment?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => {handleRemove(); handleClose()}}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Comment;