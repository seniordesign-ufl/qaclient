import React, { useContext, useState } from 'react'
import { API, AppContext } from '../AppContext'

//Bootstrap
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { BsChevronUp } from 'react-icons/bs'
import { BiComment } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'
import { BiDotsHorizontal } from 'react-icons/bi'
import { BsAwardFill } from 'react-icons/bs'
import moment from 'moment'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { Link, useRouteMatch } from 'react-router-dom'
import { animated } from 'react-spring'

import '../Styling/PostSummary.css'

function PostSummary(props) {
    const [canUpvote, setCanUpvote] = useState(true)
    const [show, setShow] = useState(false)
    const { state: contextState, dispatch } = useContext(AppContext)
    const match = useRouteMatch()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    function handlePin() {
        const postUpdate = {
            postID: props.post.id,
            pinned: !props.post.pinned,
            type: "post"
        }
        API.updatePinned(postUpdate, contextState.roomKey)
    }

    function displayOptions () {
        if(contextState.admin === true){
            return(
                <DropdownButton title={<BiDotsHorizontal />} id="basic-nav-dropdown">
                    <Dropdown.Item value="delete-post" onClick={handleShow}>
                        Delete Post
                    </Dropdown.Item>
                    <Dropdown.Item value="pin-post" onClick={handlePin}>
                        Pin Post
                    </Dropdown.Item>
                </DropdownButton>
            )
        }
        else if(contextState.displayName === props.post.author)
        {
            return(
                /* Check if current display name matches name of post. If so allow them to remove it */
                <div className="flex-none pr-4">
                    <button
                        className="w-8 h-8 flex btn-color rounded-md"
                        onClick={handleShow}
                        variant="outline-danger"
                    >
                        <IoClose className="flex-1 self-center" />
                    </button>
                </div>
            )

        }
    }

    function displayPinned() {
        if(props.post.pinned === true)
        {
            return (
                <BsAwardFill size={25} />
            )
        }
    }

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
        <animated.div style={props.animated} className="m-4 postSummary shadow-md rounded-md border border-light">
            <div className="flex">
                <div className="flex-none pl-8">
                    <button onClick={() => handleUpvote()} className="mt-2">
                        <BsChevronUp />
                    </button>
                    <br />
                    <a>{props.post.upVotes}</a>
                    <br />
                    <Link
                        style={{ pointerEvents: props.disableLink ? 'none' : '' }}
                        to={`${match.url}/${props.post.id}`}
                    >
                        <button style={{ marginTop: '10px' }}>
                            <BiComment />
                        </button>
                    </Link>
                    <br />
                    <a>{props.post.comments.length}</a>
                </div>
                <div className="pl-4 pt-2 flex-1 text-left">
                    <div className="flex justify-between">
                        <div id="post-title-div" className="flex-none">
                            {displayPinned()}
                            <p id="post-title" className="font-semibold">{props.post.title}</p>
                        </div>
                        {displayOptions()}
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
        </animated.div>
    )
}

export default PostSummary
