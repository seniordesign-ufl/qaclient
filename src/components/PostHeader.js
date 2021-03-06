import React, { useContext, useState } from 'react'
import { API, AppContext } from '../AppContext'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { IoClose } from 'react-icons/io5'
import Badge from 'react-bootstrap/Badge'
import { BiDotsHorizontal } from 'react-icons/bi'
import { BsAwardFill } from 'react-icons/bs'
import { animated, useSpring } from 'react-spring'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Link, useRouteMatch } from 'react-router-dom'
import { useHistory } from 'react-router'

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
    const match = useRouteMatch()
    const history = useHistory()
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
            solved: !props.post.solved,
        }
        API.updateSolved(postUpdate, contextState.roomKey)
    }

    function handleRemove() {
        if (match.url.endsWith(props.post.id)) {
            history.goBack()
        }
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
                        {props.post.pinned === true ? 'Unpin Post' : 'Pin Post'}
                    </Dropdown.Item>
                    <Dropdown.Item value="solve-post" onClick={handleSolved}>
                        {props.post.solved === true ? 'Mark as Unsolved' : 'Mark as Solved'}
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
    } else if (contextState.userId === props.post.authorId) {
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
    const match = useRouteMatch()

    function mapTags() {
        return (
            <div className="inline-flex w-full justify-end mr-3 text-lg font-extralight">
                {props.post.tags.map((tag, i) => (
                    <div className="mr-2" key={i}>
                        <Badge pill className="px-2 py-1.5" variant="secondary">
                            {tag}
                        </Badge>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="flex flex-1">
            <div className="flex-1 flex">
                <DisplayPinned post={props.post} />
                <Link
                    style={{ pointerEvents: props.disableLink ? 'none' : '' }}
                    to={`${match.url}/${props.post.id}`}
                    className="text-gray-900"
                >
                    <div className="flex-initial font-semibold break-all">{props.post.title}</div>
                </Link>
                <DisplaySolved solved={props.post.solved} />
            </div>
            <div className="flex justify-end">
                {props.post.tags.length > 0 ? mapTags() : null}
                <DisplayOptions setHasSolved={props.setHasSolved} post={props.post} />
            </div>
        </div>
    )
}
