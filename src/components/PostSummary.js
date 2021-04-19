import React, { useContext, useState } from 'react'
import { API, AppContext } from '../AppContext'
import PostHeader from './PostHeader'

//Bootstrap
import { FaChevronUp } from 'react-icons/fa'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Badge from 'react-bootstrap/Badge'
import { BsChevronUp } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { BiComment } from 'react-icons/bi'
import moment from 'moment'
import { Link, useRouteMatch } from 'react-router-dom'
import { animated } from 'react-spring'

import '../Styling/PostSummary.css'

function PostSummary(props) {
    const [hasUpvote, setHasUpvote] = useState(false)
    const match = useRouteMatch()
    const { state: contextState, dispatch } = useContext(AppContext)

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
            setHasUpvote(true)
        }
    }

    function displayFile() {
        if (props.post.attachment == null) {
            return null
        } else {
            var ab = new ArrayBuffer(props.post.attachment.data.length)
            var view = new Uint8Array(ab)
            for (var i = 0; i < props.post.attachment.data.length; ++i) {
                view[i] = props.post.attachment.data[i]
            }
            console.log(view)
            const blob = new Blob([view])
            console.log(blob)
            const fileDownloadURL = URL.createObjectURL(blob)
            return (
                <a download={props.post.attachmentName} href={fileDownloadURL}>
                    {props.post.attachmentName}
                </a>
            )
        }
    }

    return (
        <animated.div style={props.animated} className="m-4 py-4 postSummary shadow-md rounded-md border border-light">
            <div className="flex">
                <div className="flex-none pl-8">
                    <button disabled={hasUpvote} onClick={() => handleUpvote()} className="mt-2">
                        <FaChevronUp style={{ color: hasUpvote ? '#007bff' : '' }} />
                    </button>
                    <br />
                    <span>{props.post.upVotes}</span>
                    <br />
                    <Link
                        style={{ pointerEvents: props.disableLink ? 'none' : '' }}
                        to={`${match.url}/${props.post.id}`}
                        className="text-gray-900"
                    >
                        <button style={{ marginTop: '10px' }}>
                            <BiComment />
                        </button>
                    </Link>
                    <br />
                    <span>{props.post.comments.length}</span>
                </div>
                <div className="pl-4 pt-2 flex-1 text-left">
                    <div className="flex">
                        <PostHeader post={props.post} />
                    </div>
                    <div className="divide-y">
                        <div className="mx-4 my-2 break-all">
                            {props.post.content}
                            <br />
                            {displayFile()}
                        </div>
                        <blockquote>
                            <div className="ml-2 mt-2">
                                <div>
                                    <footer className="blockquote-footer" title={contextState.admin ? props.post.author : ""}>
                                        {props.post.isAnon ? 'Anonymous' : props.post.author},{' '}
                                        {moment(props.post.time).fromNow()}
                                    </footer>
                                </div>
                            </div>
                        </blockquote>
                    </div>
                </div>
            </div>
        </animated.div>
    )
}

export default PostSummary
