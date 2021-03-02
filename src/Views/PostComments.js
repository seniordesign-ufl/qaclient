import React, { useContext, useEffect, useState } from "react";
import { API, AppContext } from "../AppContext";
import Comment from "../components/Comment";

//Bootstrap
import { Button, Card, Form } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsChevronUp, BsChatSquareDots, BsArrowLeft } from 'react-icons/bs'

function PostComments(props) {
    const { state: contextState } = useContext(AppContext);
    const [content, setContent] = useState("");
    const [time, setTime] = useState(new Date());
    const [anonymous, setAnonymous] = useState(false);
    const [displayForm, setDisplayForm] = useState(false);
    const [canUpvote, setCanUpvote] = useState(true);

    //Handles submission of new Comment
    const handleSubmitForm = (e) => {
        setTime(new Date())

        const comment = {
            content: content,
            author: contextState.displayName,
            time: time,
            isAnon: anonymous
        };

        API.addComment(comment, props.post.title, contextState.roomKey);
        setDisplayForm(false);
        setAnonymous(false);
    };

    function handleUpvote() {
        if (canUpvote) {
            const postUpdate = {
                title: props.post.title,
                upVote: 1,
            }
            API.updatePost(postUpdate, contextState.roomKey);
            setCanUpvote(false);
        }
    }

    function calculateTime() {
        let diff = (new Date()).getTime() - new Date(props.post.time).getTime();
        return (Math.round(diff / 60000))
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleAnonymousCheck = (e) => {
        setAnonymous(!anonymous)
    };

    function handleCancelClick() {
        setDisplayForm(false);
    }

    function mapComments() {
        let comments_array = [];
        if(contextState.search_phrase !== '')
        {
            for(let i = 0; i < props.post.comments.length; i++)
            {
                if(props.post.comments[i].content.includes(contextState.search_phrase) === true)
                {
                    comments_array.push(props.post.comments[i])
                }
            }
            if(contextState.filter_by !== '')
            {
                if(contextState.filter_by === 'Popularity')
                {
                    comments_array.sort((a, b) => b.upVotes - a.upVotes);
                }
                else if(contextState.filter_by === 'Date')
                {
                    comments_array.sort((a, b) => b.time).reverse();
                }
                else if(contextState.filter_by === 'Solved')
                {
                    for(let i=0; i < comments_array.length; i++)
                    {
                        if(comments_array[i].solved === false)
                        {
                            comments_array.splice(i, 1);
                        }
                    }
                }
            }
        }
        else if(contextState.filter_by !== '')
        {
            for(let i = 0; i < props.post.comments.length; i++)
            {
                comments_array.push(props.post.comments[i]);
            }
            if(contextState.filter_by === 'Popularity')
            {
                comments_array.sort((a, b) => b.upVotes - a.upVotes);
            }
            else if(contextState.filter_by === 'Date')
            {
                comments_array.sort((a, b) => b.time).reverse();
            }
            else
            {
                for(let i=0; i < comments_array.length; i++)
                {
                    if(comments_array[i].solved === false)
                    {
                        comments_array.splice(i, 1);
                    }
                }
            }
        }
        else
        {
            console.log(props.post.comments);
            comments_array = props.post.comments;
        }
        
        return (comments_array.length !== 0 ? 
                comments_array.map((comment, i) => <Comment title={props.post.title} comment={comment} key={i}/>) 
                : <p>No comments yet</p>);
    }

    function handleBack() {
        props.display(false);
    }

    return (
        <Container>
            <Row>
                <Button variant='light' onClick={() => handleBack()} style={{ marginTop: '10px' }}><BsArrowLeft /></Button>
            </Row>
            <Row className="postCommentsRow">
                <Card style={{ width: '100%' }}>
                    <Container>
                        <Row>
                            <Col sm='1'>
                                <Button variant='light' onClick={() => handleUpvote()} style={{ marginTop: '10px' }}><BsChevronUp /></Button>
                                <br />
                                <a>{props.post.upVotes}</a>
                                <br />
                                <BsChatSquareDots />
                                <br />
                                <a>{props.post.comments.length}</a>
                            </Col>
                            <Col lg style={{ textAlign: 'left' }}>
                                <Row>
                                    <Col>
                                        <Card.Title>{props.post.title}</Card.Title>
                                    </Col>
                                </Row>
                                <Card.Text>{props.post.content}</Card.Text>
                                <blockquote>
                                    <Row>
                                        <Col>
                                            <footer className="blockquote-footer">
                                                {props.post.isAnon ? 'Anonymous' : props.post.author}
                                            </footer>
                                        </Col>
                                        <Col>
                                            <Button variant="outline-secondary" onClick={() => setDisplayForm(true)}>
                                                Reply
                                            </Button>
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
            </Row>
            <Row className="postCommentsRow">
                {displayForm &&
                <Card style={{width: "100%"}}>
                    <Row style={{width: "100%", margin: "auto"}}>
                        <Form style={{width: "100%", marginBottom: "20px"}}>
                            <Form.Group style={{marginTop: "10px"}}controlId="comment.content">
                                <Form.Label>Reply Message</Form.Label>
                                <Form.Control className="commentTextArea" as="textarea" style={{width: "80%",}} rows={5} onChange={handleContentChange} />
                            </Form.Group>
                            <Form.Group controlId="comment.anonymous">
                                <Form.Check type={"checkbox"} id={"default-checkbox"} label={"Reply Anonymously"} onClick={handleAnonymousCheck} />
                            </Form.Group>
                            <Button variant="secondary" onClick={() => handleCancelClick()}>Cancel</Button>
                            {" "}
                            <Button variant="secondary" onClick={() => handleSubmitForm()}>Add Reply</Button>
                        </Form>
                    </Row>
                </Card>
                }
            </Row>
            <Row className="postCommentsRow">
                {mapComments()}
            </Row>
        </Container>
    )
}

export default PostComments