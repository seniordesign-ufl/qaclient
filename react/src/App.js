import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import randomWords from "random-words";

var server = { urls: "stun:stun.stunprotocol.org:3478" };

function generateCode() {
  return randomWords(3).join('-');
}

function App() {
  const [roomGenerated, updateRoomGenerated] = useState(false);
  const [status, updateStatus] = useState("Loaded");
  const [name, updateName] = useState("None Entered");
  const [code, updateCode] = useState(generateCode());
  const [inputCode, _updateInputCode] = useState(generateCode());

  const checkRoomStatus = (e) => {
    if (roomGenerated == false)
    {
      console.log("Room Is Not Generated!");
    }
    else
    {
      console.log("Room Exists");
    }
  }

  const updateInputCode = (e) => {
    _updateInputCode(e.target.value);
  }

  const userSubmitCode = (e) => {
    e.preventDefault();
    console.log("Submitted: ", inputCode)
  }

  const updateRoomCode = (e) => {
    updateCode(generateCode);
    updateRoomGenerated(true);
  }

  const updateUserName = (e) => {
    updateName(e.target.value);
  }

  return (
    <div className="App">
      <div className="App-Form">
          <input placeholder="Enter Display Name" onChange={updateUserName} /> <br />
          <button onClick={updateRoomCode}>Generate Room</button>
          <p>
            Code: {code} <br />
            Is A Room Generated? {roomGenerated.toString()}
          </p>

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
      </div>
    </div>
  );
}

export default App;
