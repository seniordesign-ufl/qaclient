import { React, useContext, useEffect, useState } from 'react'
import { API, AppContext } from '../AppContext'
import { toast } from 'react-toastify'

import Header from '../components/Header'
import RoomIllustration from '../static/room_illustration.svg'

import '../Styling/EnterDisplayName.css'

export default function EnterDisplayName(props) {
    const { state: contextState, dispatch } = useContext(AppContext)
    const [name, setName] = useState('')
    function handleJoinClick(e) {
        e.preventDefault()
        API.join(name, props.match.params.roomID)
        dispatch({ type: 'update-name', displayName: name })
        if (contextState.kicked === true) {
            dispatch({ type: 'remove-kicked' })
        }
    }

    return (
        <div>
            <Header roomKey={contextState.roomKey} />
            <div className="grid grid-cols-2 m-3">
                <div className="ml-9 mt-8 p-10">
                    <h3 className="font-bold text-6xl">Let's get talking!</h3>
                    <br />
                    <p className="font-medium text-lg">Introducing a new way to have live lecture discussion.</p>
                    <img className="mx-auto" src={RoomIllustration} />
                </div>

                <div className="join-page ml-8 p-10">
                    <div className="">
                        <div>
                            <p className="font-medium">You've been invited!</p>
                            <h4 className="display-name font-bold text-3xl mb-10 text-gray-700">
                                Join the Discussion Room
                            </h4>
                            {contextState.kicked ? (
                                <h3 className="font-bold text-3xl mb-10 text-gray-700">
                                    You've been kicked! You can rejoin the room.
                                </h3>
                            ) : null}
                            <form onSubmit={handleJoinClick}>
                                <label
                                    htmlFor="displayName"
                                    className="float-left text-gray-700 text-md font-bold mt-2"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="displayName"
                                    className="form-control w-full"
                                    aria-describedby="passwordHelpBlock"
                                    placeholder="Enter Your Name"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <br />
                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg generate-btn"
                                    onClick={handleJoinClick}
                                >
                                    Join Room
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
