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
    const postID = props.match.params.postID
    const post = contextState.posts.find((p) => p.id === postID)
    const [displayForm, setDisplayForm] = useState(false)

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
        return (
            <div>
                Post not found.
                <Link to=".">
                    <Button variant="light" style={{ marginTop: '10px' }}>
                        <BsArrowLeft />
                    </Button>
                </Link>
            </div>
        )
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
            <Row className="postCommentsRow">
                {displayForm ? (
                    <ReplyBox contextState={contextState} setDisplayForm={setDisplayForm} post={post} />
                ) : (
                    <button onClick={() => setDisplayForm(true)}>Reply</button>
                )}
            </Row>
            <Row className="postCommentsRow">{mapComments()}</Row>
        </Container>
    )
}

export default PostComments

function ReplyBox(props) {
    const contextState = props.contextState
    const setDisplayForm = props.setDisplayForm
    const [content, setContent] = useState('')
    const [time, setTime] = useState(new Date())
    const [anonymous, setAnonymous] = useState(false)

    //Handles submission of new Comment
    const handleSubmitForm = (e) => {
        setTime(new Date())

        const comment = {
            content: content,
            author: contextState.displayName,
            time: time,
            isAnon: anonymous,
        }
        console.log(props.post.id)

        API.addComment(comment, props.post.id, contextState.roomKey)
        setDisplayForm(false)
        setAnonymous(false)
    }
    const handleContentChange = (e) => {
        setContent(e.target.value)
    }

    const handleAnonymousCheck = (e) => {
        setAnonymous(!anonymous)
    }

    function handleCancelClick() {
        setDisplayForm(false)
    }
    return (
        <Card style={{ width: '100%' }}>
            <Row style={{ width: '100%', margin: 'auto' }}>
                <Form style={{ width: '100%', marginBottom: '20px' }}>
                    <Form.Group style={{ marginTop: '10px' }} controlId="comment.content">
                        <Form.Label>Reply Message</Form.Label>
                        <Form.Control
                            className="commentTextArea"
                            as="textarea"
                            style={{ width: '80%' }}
                            rows={5}
                            onChange={handleContentChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="comment.anonymous">
                        <Form.Check
                            type={'checkbox'}
                            id={'default-checkbox'}
                            label={'Reply Anonymously'}
                            onClick={handleAnonymousCheck}
                        />
                    </Form.Group>
                    <Button variant="secondary" onClick={() => handleCancelClick()}>
                        Cancel
                    </Button>{' '}
                    <Button variant="secondary" onClick={() => handleSubmitForm()}>
                        Add Reply
                    </Button>
                </Form>
            </Row>
        </Card>
    )
}
