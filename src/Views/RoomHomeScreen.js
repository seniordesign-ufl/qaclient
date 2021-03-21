import React, { useContext, useEffect, useState } from 'react'
import { API, AppContext } from '../AppContext'
import PostList from './PostList'
import PostComments from './PostComments'

export default function RoomHomeScreen(props) {
    const { state: contextState } = useContext(AppContext)
    const [displayComments, setDisplayComments] = useState(false)
    const [selectedPostIndex, setSelectedPostIndex] = useState(-1)

    return (
        <div>
            {displayComments ? (
                <PostComments post={contextState.posts[selectedPostIndex]} display={setDisplayComments} />
            ) : (
                <PostList selectPost={setSelectedPostIndex} displayComments={setDisplayComments} />
            )}
        </div>
    )
}
