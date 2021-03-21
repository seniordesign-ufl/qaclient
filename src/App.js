import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

/* Views */
import Landing from './Views/LandingPage'
import Room from './Views/Room'

/* Styling */
import './Styling/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ContextProvider, initSockets } from './AppContext'
import { ToastContainer } from 'react-toastify'

function App() {
    return (
        <ContextProvider init={initSockets}>
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route exact path={`/`}>
                            <Landing />
                        </Route>
                        <Route exact path={`/room/:roomID/`} component={Room}></Route>
                    </Switch>
                </BrowserRouter>
                {/* <Posts />
      <PostContent /> */}
                <ToastContainer />
            </div>
        </ContextProvider>
    )
}

export default App
