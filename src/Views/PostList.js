import PostSummary from "../components/PostSummary"
import React, { useContext, useEffect, useState } from "react";
import { API, AppContext } from "../AppContext";
import CreatePost from "../components/NewPost";
import Download from "../components/Download"

//Bootstrap
import { Button, Modal } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BsPerson, BsConeStriped } from 'react-icons/bs'

import '../Styling/PostList.css'
import { animated, useTransition } from 'react-spring'

export default function CommentList(props) {
    const { state: contextState } = useContext(AppContext)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    let posts = contextState.posts
    const transitions = useTransition(posts, post => post.id, {
        from: { transform: 'translate3d(0,-20%,0)', opacity: 0 },
        enter: { transform: 'translate3d(0,0,0)', opacity: 1 },
        leave: { transform: 'translate3d(0,-20%,0)', opacity: 0 },
    })

    if (contextState.search_phrase !== '') {
        posts = posts.filter((c) => c.title.includes(contextState.search_phrase))
    }

    if (contextState.filter_by === 'Popularity') {
        posts.sort((a, b) => b.upVotes - a.upVotes)
    } else if (contextState.filter_by === 'Date') {
        posts.sort((a, b) => b.time).reverse()
    } else if (contextState.filter_by === 'Solved') {
        let temp = []
        posts.forEach((element) => {
            if (element.solved === true) {
                temp.append(element)
            }
        })
        posts = temp
    }

    return (
        <div className="container roomContainer">
            <div className="flex justify-between">
                <div id="discussionHeader">
                    <h2 className="pr-4">
                        Discussion{' '}
                        <div className="pl-2 inline">
                            <BsPerson className="text-base inline" />{' '}
                            <div className="text-base inline align-middle">{contextState.users.length}</div>
                        </div>
                    </h2>
                </div>
                <div className="flex">
                    <Button id="newDiscussion" onClick={handleShow}>
                        + Start New Discussion
                    </Button>
                    {show ? <CreatePost show={show} onHide={handleClose} /> : null}
                </div>
            </div>
            <Row>
                {(posts.length &&
                    transitions.map(({ item, props, key }) => (
                        <PostSummary animated={props} post={item} key={key} />
                    ))) || <p>No posts yet.</p>}
            </Row>
        </div>
    )
}
