import React from 'react'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'

/* Views */
import Landing from './Views/LandingPage'
import Room from './Views/Room'

/* Styling */
import './Styling/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    const { pathname } = useLocation();
    return (
        <div className="App">
            <Switch>
                <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                <Route exact path={`/`} component={Landing} />
                <Route path={`/room/:roomID/`} component={Room} />
            </Switch>
            {/* <Posts />
      <PostContent /> */}
        </div>
    )
}

export default App
