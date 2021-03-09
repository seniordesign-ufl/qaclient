import PostSummary from "../components/PostSummary"
import React, { useContext, useEffect, useState } from "react";
import { API, AppContext } from "../AppContext";
import CreatePost from "../components/NewPost";

//Bootstrap
import { Button, Modal } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsPerson, BsConeStriped } from 'react-icons/bs';

export default function CommentList(props) {
    const { state: contextState } = useContext(AppContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function mapPosts() {
        let posts_array = contextState.search_phrase === '' ? contextState.posts : contextState.posts.filter(c => c.title.includes(contextState.search_phrase));

        if(contextState.filter_by === 'Popularity')
        {
            posts_array = posts_array.slice().sort((a, b) => b.upVotes - a.upVotes);
        }
        else if(contextState.filter_by === 'Date')
        {
            posts_array = posts_array.slice().sort((a, b) => b.time).reverse();
        }
        else if(contextState.filter_by === 'Solved')
        {
            let temp = []
            posts_array.slice().forEach(element => {
                if(element.solved===true)
                {
                    temp.append(element)
                }
            });
            posts_array = temp;
        }

        return (posts_array.length !== 0 ? 
                posts_array.map((post, i) => <PostSummary select={props.selectPost} display={props.displayComments} post={post} key={i} />) 
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