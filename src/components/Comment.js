import React, { useContext, useState } from 'react'
import { animated } from 'react-spring'
import { API, AppContext } from '../AppContext'

//Bootstrap
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { IoClose } from 'react-icons/io5'
import moment from 'moment'
import { BsChevronUp } from 'react-icons/bs'
import { BiDotsHorizontal } from 'react-icons/bi'
import { BsAwardFill } from 'react-icons/bs'
import { DropdownButton, Dropdown } from 'react-bootstrap'

function Comment(props) {
    const [show, setShow] = useState(false)
    const { state: contextState, dispatch } = useContext(AppContext)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    function handleUpvote() {
        if (!contextState.upVotes.includes(props.comment.id)) {
            const commentUpdate = {
                postID: props.postID,
                commentID: props.comment.id,
                upVote: 1,
            }
            console.log(commentUpdate)
            API.updateComment(commentUpdate, contextState.roomKey)
            dispatch({
                type: 'update-upVotes',
                upVotes: contextState.upVotes.concat([props.comment.id]),
            })
        }
    }

    function handleRemove() {
        const removeComment = {
            postID: props.postID,
            commentID: props.comment.id,
        }
        API.removeComment(removeComment, contextState.roomKey)
    }

    // function displayOptions () {
    //     if(contextState.admin === true){
    //         return(
    //             <DropdownButton title={<BiDotsHorizontal />} id="basic-nav-dropdown">
    //                 <Dropdown.Item value="delete-post" onClick={handleShow}>
    //                     Delete Comment
    //                 </Dropdown.Item>
    //                 <Dropdown.Item value="pin-post" onClick={handleComment}>
    //                     Pin Comment
    //                 </Dropdown.Item>
    //             </DropdownButton>
    //         )
    //     }
    //     else if(contextState.displayName === props.post.author)
    //     {
    //         return(
    //             /* Check if current display name matches name of comment. If so allow them to remove it */
    //             <div className="flex-none pr-4">
    //                 <button
    //                     className="w-8 h-8 flex btn-color rounded-md"
    //                     onClick={handleShow}
    //                     variant="outline-danger"
    //                 >
    //                     <IoClose className="flex-1 self-center" />
    //                 </button>
    //             </div>
    //         )

    //     }
    // }

    return (
        <animated.div
            style={props.animated}
            className="comment m-4 postSummary shadow-md rounded-md border border-light"
        >
            <div className="flex">
                <div className="flex-none pl-8">
                    <button className="mt-2" onClick={() => handleUpvote()}>
                        <BsChevronUp />
                    </button>
                    <br />
                    <a>{props.comment.upVotes}</a>
                </div>
                <div className="flex-1 pl-4 pt-2 text-left">
                    {
                        /* Check if current display name matches name of post. If so allow them to remove it */
                        contextState.displayName === props.comment.author && (
                            <div className="float-right pt-2 pr-4">
                                <button className="w-8 h-8 flex btn-color rounded-md" onClick={handleShow}>
                                    <IoClose className="flex-1 self-center" />
                                </button>
                            </div>
                        )
                    }
                    <div className="divide-y">
                        <div className="pt-4 pl-4 pb-12">{props.comment.content}</div>
                        <blockquote>
                            <div className="pl-2 pt-2">
                                <div>
                                    <footer className="blockquote-footer">
                                        {props.comment.isAnon ? 'Anonymous' : props.comment.author},{' '}
                                        {moment(props.comment.time).fromNow()}
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
                    <Modal.Title>Remove this comment?</Modal.Title>
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

export default Comment
