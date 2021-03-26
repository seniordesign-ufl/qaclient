import React, { useContext, useState } from 'react'
import { API, AppContext } from '../AppContext'
import PostHeader from './PostHeader'

//Bootstrap
import { FaChevronUp } from 'react-icons/fa'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Badge from 'react-bootstrap/Badge'
import { BsChevronUp } from 'react-icons/bs'
import {IoClose} from 'react-icons/io5'
import { BiComment } from 'react-icons/bi'
import moment from 'moment'
import { Link, useRouteMatch } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'

import '../Styling/PostSummary.css'

function PostSummary(props) {
    const [hasUpvote, setHasUpvote] = useState(false)
    const [hasSolved, setHasSolved] = useState(false)
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

    function mapTags() {
        return (
            <div className="inline-flex w-full justify-end mr-3 text-lg font-extralight">
                  {props.post.tags.map((tag, i) => 
                    <div className="mr-2" key={i}>
                        <Badge pill className="px-2 py-1.5" variant="secondary">
                            {tag}
                        </Badge>
                    </div>
                    )}     
            </div>
        )
    }

    function handleRemove() {
        API.removePost(props.post.id, contextState.roomKey);
    }

    function handleComment() {
        props.select(contextState.posts.findIndex((element) => element.title === props.post.title));
        props.display(true);
    }

    return (
        <animated.div style={props.animated} className="m-4 postSummary shadow-md rounded-md border border-light">
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
                <div className="ml-4 mt-2 flex-1 text-left">
                    <PostHeader post={props.post} setHasSolved={setHasSolved} solved={hasSolved} />
                </div>
                <div className="pl-4 pt-2 flex-1 text-left">
                    <div className="flex justify-between">
                        {props.post.tags.length > 0 ? mapTags() : null}
                        {
                            /* Check if current display name matches name of post. If so allow them to remove it */
                            contextState.displayName === props.post.author && (
                                <div className="flex-none pr-4">
                                    <button
                                        className="w-8 h-8 flex btn-color rounded-md"
                                        onClick={handleRemove}
                                        variant="outline-danger"
                                    >
                                        <IoClose className="flex-1 self-center" />
                                    </button>
                                </div>
                            )
                        }
                    </div>
                    <div className="divide-y">
                        <div className="mx-4 my-2 break-all">{props.post.content}</div>
                        <blockquote>
                            <div className="ml-2 mt-2">
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
        </animated.div>
    )
}

export default PostSummary
