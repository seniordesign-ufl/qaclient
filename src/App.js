import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

/* Views */
import Join from "./components/Join";
import Posts from "./components/Post";
import PostContent from "./components/PostContent"
import Landing from "./Views/LandingPage";
import Room from "./Views/Room";

/* Styling */
import "./Styling/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppContext, ContextProvider } from "./AppContext";

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path={`/`}><Landing /></Route>
            <Route exact path={`/room/:roomID/`} component={Room}></Route>
          </Switch>
        </BrowserRouter>
        {/* <Posts />
      <PostContent /> */}
      </div>
    </ContextProvider>
  );
}

export default App;
