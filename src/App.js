import React, { useState } from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import randomWords from "random-words";
import ReactDOM from "react-dom";

/* Views */
import Generate from "./Views/Generate";
import Join from "./Views/Join";
import Posts from "./Views/Post";
import PostContent from "./Views/PostContent"
import Landing from "./Views/LandingPage";

/* Styling */
import "./Styling/App.css";

var server = { urls: "stun:stun.stunprotocol.org:3478" };

function generateCode() {
  return randomWords(3).join('-');
}

function App() {
  const [showLink, updateShowLink] = useState(false);
  const [status, updateStatus] = useState("Loaded");
  const [name, updateName] = useState("");
  const [displayName, updateDisplayName] = useState("");
  const [code, updateCode] = useState(generateCode());
  const [inputCode, _updateInputCode] = useState(generateCode());

  const updateInputCode = (e) => {
    _updateInputCode(e.target.value);
  }

  const userSubmitCode = (e) => {
    e.preventDefault();
    console.log("Submitted: ", inputCode)
  }

  /* 
    Function That Executes When Generate Room Button Is Clicked
    Updates The Room Code, Display Name, and Sets The Show Link Boolean to True
    The Code and Display Name Will Be Sent Over To The Generate Component
  */
  function handleGenerateClick (e) {
    updateCode(generateCode);
    updateDisplayName(name);
    updateShowLink(true);
  }

  const updateUserName = (e) => {
    updateName(e.target.value);
  }

  const Budget = () => {
    console.log("WE've ARrived!");
  }
  
  return (
    <div className="App">
      <div className="App-Form">
        <BrowserRouter>
          <Switch>
            <Route path={`/`} render={(props => <Landing room={code} update_room={updateCode} name={displayName} update_name={updateDisplayName} should_show_link={showLink} update_show_link={updateShowLink} />)} />
          </Switch>
        </BrowserRouter>
        <input placeholder="Enter Display Name" onChange={updateUserName}/> <br />
        <button onClick={handleGenerateClick}>Generate Room</button>
        {showLink ? <Generate room={code} name={displayName} /> : null}
      </div>
      <p>
        {status}
      </p>

      <p>
        Your code is: {code}
      </p>
      <div>
        <form onSubmit={userSubmitCode}>
          <input onChange={updateInputCode}></input>
        </form>
        <Posts />
        <PostContent />
      </div>
    </div>
  );
}

export default App;
