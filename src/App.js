import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import randomWords from "random-words";

var server = { urls: "stun:stun.stunprotocol.org:3478" };

function generateCode() {
  return randomWords(3).join('-');
}

function App() {
  const [status, updateStatus] = useState("Loaded");
  const [code, updateCode] = useState(generateCode());
  const [inputCode, _updateInputCode] = useState(generateCode());

  const updateInputCode = (e) => {
    _updateInputCode(e.target.value);
  }

  const userSubmitCode = (e) => {
    e.preventDefault();
    console.log("Submitted: ", inputCode)
  }

  return (
    <div className="App">
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
      </div>
    </div>
  );
}

export default App;
