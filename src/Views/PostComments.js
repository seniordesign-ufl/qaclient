import React, { useContext, useEffect, useState } from 'react'
import { useTransition } from 'react-spring'
import { API, AppContext } from '../AppContext'
import Comment from '../components/Comment'

//Bootstrap
import { Button, Card, Form } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { BsChevronUp, BsChatSquareDots, BsArrowLeft, BsReply } from 'react-icons/bs'
import PostSummary from '../components/PostSummary'
import { Link } from 'react-router-dom'

function PostComments(props) {
    const { state: contextState, dispatch } = useContext(AppContext)
    const postID = props.match.params.postID
    const post = contextState.posts.find((p) => p.id === postID)
    const [displayForm, setDisplayForm] = useState(false)

    let comments = Array.from(post.comments)

    if (contextState.search_phrase !== '') {
        comments = comments.filter((c) => c.content.includes(contextState.search_phrase))
    }

    if (contextState.filter_by === 'Popularity') {
        comments = comments.slice().sort((a, b) => b.upVotes - a.upVotes)
    } else if (contextState.filter_by === 'Date') {
        comments = comments
            .slice()
            .sort((a, b) => b.time)
            .reverse()
    } else if (contextState.filter_by === 'Solved') {
        let temp = []
        comments.slice().forEach((element) => {
            if (element.solved === true) {
                temp.push(element)
            }
        })
        comments = temp
    }

    const transitions = useTransition(comments, (post) => post.id, {
        from: { transform: 'translate3d(0,-20%,0)', opacity: 0 },
        enter: { transform: 'translate3d(0,0,0)', opacity: 1 },
        leave: { transform: 'translate3d(0,-20%,0)', opacity: 0 },
    })

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
            <div className="flex">
                <div className="flex-1">
                    <PostSummary post={post} disableLink />
                    <Row className="postCommentsRow">
                        {displayForm ? (
                            <ReplyBox contextState={contextState} setDisplayForm={setDisplayForm} post={post} />
                        ) : (
                            <button
                                className="flex btn-color font-bold rounded-md ml-8 p-2"
                                onClick={() => setDisplayForm(true)}
                            >
                                Reply
                                <BsReply className="inline self-center" />
                            </button>
                        )}
                    </Row>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="pl-4 mt-4 mx-4" style={{ height: "80vh" }}>
                        {(comments.length &&
                            transitions.map(({ item, props, key }) => (
                                <Comment animated={props} postID={post.id} comment={item} key={key} />
                            ))) || <p>No comments yet</p>}
                    </div>
                </div>
            </div>
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
