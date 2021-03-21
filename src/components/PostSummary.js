import React, { useContext, useState } from 'react'
import { API, AppContext } from '../AppContext'

//Bootstrap
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { BsChevronUp } from 'react-icons/bs'
import { BiComment } from 'react-icons/bi'
import moment from 'moment'

function PostSummary(props) {
    const [canUpvote, setCanUpvote] = useState(true)
    const [show, setShow] = useState(false)
    const { state: contextState, dispatch } = useContext(AppContext)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    function handleUpvote() {
        if (!contextState.upVotes.includes(props.post.id)) {
            const postUpdate = {
                postID: props.post.id,
                upVote: 1,
            }
            API.updatePost(postUpdate, contextState.roomKey)
            dispatch({
                type: 'update-upVotes',
                upVotes: contextState.upVotes.concat([props.post.id]),
            })
        }
    }

    function handleRemove() {
        API.removePost(props.post.id, contextState.roomKey)
    }

    function handleComment() {
        props.select(contextState.posts.findIndex((element) => element.title === props.post.title))
        props.display(true)
    }

    return (
        <div className="m-4 postSummary shadow-md rounded-md border border-light">
            <div className="flex">
                <div className="flex-none pl-8">
                    <button onClick={() => handleUpvote()} style={{ marginTop: '10px' }}>
                        <BsChevronUp />
                    </button>
                    <br />
                    <a>{props.post.upVotes}</a>
                    <br />
                    <button onClick={() => handleComment()} style={{ marginTop: '10px' }}>
                        <BiComment />
                    </button>
                    <br />
                    <a>{props.post.comments.length}</a>
                </div>
                <div className="pl-4 flex-1 text-left">
                    <div className="flex justify-between">
                        <div className="flex-none">
                            <p className="font-semibold">{props.post.title}</p>
                        </div>

                        {
                            /* Check if current display name matches name of post. If so allow them to remove it */
                            // contextState.displayName === props.post.author &&
                            <div className="flex-none pr-8">
                                <Button onClick={handleShow} variant="outline-danger" style={{ marginTop: '10px' }}>
                                    X
                                </Button>
                            </div>
                        }
                    </div>
                    <div className="divide-y">
                        <div className="pl-2 pb-4">{props.post.content}</div>
                        <blockquote>
                            <div className="pl-2 pt-2">
                                <div>
                                    <footer className="blockquote-footer">
                                        {props.post.isAnon ? 'Anonymous' : props.post.author},{' '}
                                        {moment(props.post.time).fromNow()}
                                    </footer>
                                </div>
                            </div>
                        </blockquote>
                    </div>
                </div>
            </div>
            {/* Confirmation for Removing Post */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove this post?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleRemove()
                            handleClose()
                        }}
                    >
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PostSummary
