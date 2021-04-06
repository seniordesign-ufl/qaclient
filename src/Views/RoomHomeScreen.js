import React from 'react'
import PostList from './PostList'
import PostComments from './PostComments'
import { Route, Switch } from 'react-router'

export default function RoomHomeScreen(props) {
    return (
        <div>
            <Switch>
                <Route path={`/room/:roomID/:postID`} component={PostComments} />
                <Route path={`/room/:roomID`} component={PostList} />
            </Switch>
        </div>
    )
}
