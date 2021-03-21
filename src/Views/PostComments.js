import React, { useContext, useEffect, useState } from 'react'
import { API, AppContext } from '../AppContext'
import Comment from '../components/Comment'

//Bootstrap
import { Button, Card, Form } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BsChevronUp, BsChatSquareDots, BsArrowLeft } from 'react-icons/bs'
import PostSummary from '../components/PostSummary'
import { Link } from 'react-router-dom'

function PostComments(props) {
    const { state: contextState, dispatch } = useContext(AppContext)
    const postID = props.match.params.postID;
    const post = contextState.posts.find(p => p.id === postID);

    function mapComments() {
        let comments_array =
            contextState.search_phrase === ''
                ? post.comments
                : post.comments.filter((c) => c.content.includes(contextState.search_phrase))

        if (contextState.filter_by === 'Popularity') {
            comments_array = comments_array.slice().sort((a, b) => b.upVotes - a.upVotes)
        } else if (contextState.filter_by === 'Date') {
            comments_array = comments_array
                .slice()
                .sort((a, b) => b.time)
                .reverse()
        } else if (contextState.filter_by === 'Solved') {
            let temp = []
            comments_array.slice().forEach((element) => {
                if (element.solved === true) {
                    temp.append(element)
                }
            })
            comments_array = temp
        }
        return comments_array.length !== 0 ? (
            comments_array.map((comment, i) => <Comment postID={post.id} comment={comment} key={i} />)
        ) : (
            <p>No comments yet</p>
        )
    }

    if (!post) {
        return <p>Post not found.</p>
    }

    return (
        <Container>
            <Row>
                <Link to=".">
                    <Button variant="light" style={{ marginTop: '10px' }}>
                        <BsArrowLeft />
                    </Button>
                </Link>
            </Row>
            <PostSummary post={post} disableLink />
            <Row>
                Reply:
            </Row>
            <Row className="postCommentsRow">{mapComments()}</Row>
        </Container>
    )
}

export default PostComments
