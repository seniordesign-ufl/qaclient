import React, { useContext, useState } from 'react'
import { API, AppContext } from '../AppContext'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { IoClose } from 'react-icons/io5'
import { BiDotsHorizontal } from 'react-icons/bi'
import { BsAwardFill } from 'react-icons/bs'
import { animated, useSpring } from 'react-spring'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function DisplayPinned(props) {
    const styleProps = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
    })
    if (props.post.pinned) {
        return (
            <animated.div style={styleProps}>
                <BsAwardFill title="Pinned" size={25} style={{ color: '#e98074' }} />
            </animated.div>
        )
    } else {
        return null
    }
}

function DisplaySolved(props) {
    const styleProps = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
    })

    if (props.solved) {
        return (
            <animated.div
                style={styleProps}
                className="bg-red-300 ml-2 mr-2 p-1 rounded-xl shadow-sm flex-initial max-h-6 text-white text-xs flex"
            >
                <span className="self-center">SOLVED</span>
            </animated.div>
        )
    } else {
        return null
    }
}

function DisplayOptions(props) {
    const [show, setShow] = useState(false)
    const { state: contextState, dispatch } = useContext(AppContext)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    function handlePin() {
        const postUpdate = {
            postID: props.post.id,
            pinned: !props.post.pinned,
            type: 'post',
        }
        API.updatePinned(postUpdate, contextState.roomKey)
    }

    function handleSolved() {
        const postUpdate = {
            postID: props.post.id,
            solved: !props.post.solved
        }
        API.updateSolved(postUpdate, contextState.roomKey)
    }

    function handleRemove() {
        API.removePost(props.post.id, contextState.roomKey)
    }

    if (contextState.admin === true) {
        return (
            <>
                <DropdownButton className="flex-none" title={<BiDotsHorizontal />} id="basic-nav-dropdown">
                    <Dropdown.Item value="delete-post" onClick={handleShow}>
                        Delete Post
                    </Dropdown.Item>
                    <Dropdown.Item value="pin-post" onClick={handlePin}>
                        Pin Post
                    </Dropdown.Item>
                    <Dropdown.Item value="solve-post" onClick={handleSolved}>
                        Mark as Solved
                    </Dropdown.Item>
                </DropdownButton>
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
            </>
        )
    } else if (contextState.displayName === props.post.author) {
        return (
            /* Check if current display name matches name of post. If so allow them to remove it */
            <div className="flex-none pr-4">
                <button className="w-8 h-8 flex btn-color rounded-md" onClick={handleShow} variant="outline-danger">
                    <IoClose className="flex-1 self-center" />
                </button>
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
    } else {
        return null
    }
}

export default function PostHeader(props) {
    return (
        <div className="flex justify-between">
            <div className="flex-initial flex">
                <DisplayPinned post={props.post} />
                <div className="flex-initial font-semibold break-all">{props.post.title}</div>
                {props.post.solved && <DisplaySolved solved={props.post.solved} />}
            </div>
            <DisplayOptions setHasSolved={props.setHasSolved} post={props.post} />
        </div>
    )
}
