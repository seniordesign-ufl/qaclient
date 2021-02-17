import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import { socket } from "../service/socket";

//Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsChevronUp } from 'react-icons/bs'
import { BsChatSquareDots } from 'react-icons/bs'

function PostSummary(props) {
    const [canUpvote, setCanUpvote] = useState(true)
    const { state: contextState, dispatch } = useContext(AppContext);

    function handleUpvote() {
        if (canUpvote) {
            const postUpdate = {
                title: props.post.title,
                upVote: 1
            }
            console.log(postUpdate)
            socket.emit('update-post', ({ postUpdate: postUpdate, groupID: contextState.roomKey }));
            setCanUpvote(false);
        }
    }

    function calculateTime() {
        let diff = (new Date()).getTime() - new Date(props.post.time).getTime();
        return (Math.round(diff / 60000))
    }

    return (
        <div class='postSummary'>
            <Card style={{ width: '100%' }}>
                <Container>
                    <Row>
                        <Col sm='1'>
                            <Button variant='light' onClick={() => handleUpvote()} style={{ marginTop: '10px' }}><BsChevronUp /></Button>
                            <br />
                            <a>{props.post.upVotes}</a>
                            <br />
                            <Button variant='light' style={{ marginTop: '10px' }}><BsChatSquareDots /></Button>
                            <br />
                            <a>{props.post.comments}</a>
                        </Col>
                        <Col lg style={{ textAlign: 'left' }}>
                            <Card.Title>{props.post.title}</Card.Title>
                            <Card.Text>{props.post.content}</Card.Text>
                            <blockquote>
                                <Row>
                                    <Col>
                                        <footer className="blockquote-footer">
                                            {props.post.isAnon ? 'Anonymous' : props.post.author}
                                        </footer>
                                    </Col>
                                    <Col sm={2}>
                                        <p class='postTime'>{calculateTime()} mins ago</p>
                                    </Col>
                                </Row>
                            </blockquote>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </div>
    )

}

export default PostSummary;