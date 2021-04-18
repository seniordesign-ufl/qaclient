import React, { useEffect } from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'

/* Views */
import Landing from './Views/LandingPage'
import Room from './Views/Room'

/* Styling */
import './Styling/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAppState, useDispatch } from './AppContext'

function App() {
    const { pathname } = useLocation()
    const state = useAppState()
    return (
        <div className="App">
            <Switch>
                {state.redirect && <RouteToRoom />}
                <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                <Route exact path={`/`} component={Landing} />
                <Route path={`/room/:roomID/`} component={Room} />
            </Switch>
            {/* <Posts />
      <PostContent /> */}
        </div>
    )
}

function RouteToRoom() {
    const state = useAppState()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: 'redirect-false' })
    })
    return <Redirect to={`/room/${state.roomKey}`} />
}

export default App
