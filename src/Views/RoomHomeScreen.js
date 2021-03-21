import React, { useContext, useEffect, useState } from 'react'
import { API, AppContext } from '../AppContext'
import PostList from './PostList'
import { Route, Switch } from 'react-router'
import PostComments from './PostComments'

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
