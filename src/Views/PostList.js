import PostSummary from "../components/PostSummary"
import React, { useContext, useEffect, useState } from "react";
import { API, AppContext } from "../AppContext";
import CreatePost from "../components/NewPost";

//Bootstrap
import { Button, Modal } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsPerson } from 'react-icons/bs';

export default function CommentList(props) {
    const { state: contextState } = useContext(AppContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function mapPosts() {
        return (contextState.posts.length !== 0 ? 
                contextState.posts.map((post, i) => <PostSummary select={props.selectPost} display={props.displayComments} post={post} key={i} />) 
                : <p>No posts yet</p>);
    }

    return <div>
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
                    {show ? <CreatePost show={show} onHide={handleClose} /> : null}
                </Col>
            </Row>
            <Row>
                {mapPosts()}
            </Row>
        </Container>
    </div>;
}