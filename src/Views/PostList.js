import PostSummary from '../components/PostSummary'
import React, { useContext, useEffect, useState } from 'react'
import { API, AppContext } from '../AppContext'
import CreatePost from '../components/NewPost'

//Bootstrap
import { Button } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import { BsPerson } from 'react-icons/bs'

import '../Styling/PostList.css'
import { useTransition } from 'react-spring'

export default function CommentList(props) {
    const { state: contextState } = useContext(AppContext)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    let posts = Array.from(contextState.posts)

    if (contextState.search_phrase !== '') {
        posts = posts.filter((c) => c.title.includes(contextState.search_phrase) ||
            c.tags.find((tag) => tag.includes(contextState.search_phrase)) !== undefined)
    }

    if (contextState.filter_by === 'Popularity') {
        posts.sort((a, b) => b.upVotes - a.upVotes)
    } else if (contextState.filter_by === 'Date') {
        posts.sort((a, b) => b.time).reverse()
    } else if (contextState.filter_by === 'Solved') {
        let temp = []
        posts.forEach((element) => {
            if (element.solved === true) {
                temp.push(element)
            }
        })
        posts = temp
    }

    const transitions = useTransition(posts, (post) => post.id, {
        from: { transform: 'translate3d(0,-20%,0)', opacity: 0 },
        enter: { transform: 'translate3d(0,0,0)', opacity: 1 },
        leave: { transform: 'translate3d(0,-20%,0)', opacity: 0 },
    })

    function displayPinnedPosts() {
        let pinnedPost = posts.filter((c) => c.pinned === true)

        if (pinnedPost.length > 0) {
            return (
                <Row>
                    <h5 className="font-bold ml-3 text-gray-500">PINNED</h5>
                    {pinnedPost.map((p, i) => (
                        <PostSummary select={props.selectPost} display={props.displayComments} post={p} key={i} />
                    ))}
                </Row>
            )
        }
    }

    function displayAllPosts() {
        let nonPinnedPosts = transitions.filter((c) => c.item.pinned === false)
        if (nonPinnedPosts.length > 0) {
            return (
                <Row>
                    <h5 className="font-bold ml-3 text-gray-500">DISCUSSION</h5>
                    {posts.length !== 0 ?
                        nonPinnedPosts.map(({ item, props, key }) => (
                            <PostSummary animated={props} post={item} key={key} />
                        )) : null}
                </Row>
            )
        } else if (contextState.posts.length > 0) {
            return null
        }
        else {
            return <p>No Posts Available!</p>
        }
    }

    return (
        <div className="container roomContainer">
            <div className="flex justify-between flex-col md:flex-row">
                <div id="discussionHeader">
                    <h2 className="font-bold text-4xl pr-4">
                        {contextState.discussionName !== '' ? contextState.discussionName : "Discussion"}{' '}
                        <div className="pl-2 inline">
                            <BsPerson className="text-base inline" />{' '}
                            <div className="text-base inline align-middle">{contextState.users.length}</div>
                        </div>
                    </h2>
                </div>
                <div>
                    <Button id="newDiscussion" onClick={handleShow}>
                        + Start New Discussion
                    </Button>
                    {show ? <CreatePost show={show} onHide={handleClose} /> : null}
                </div>
            </div>
            {displayPinnedPosts()}
            {displayAllPosts()}
        </div>
    )
}
