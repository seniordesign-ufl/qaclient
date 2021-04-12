import { React, useContext, useEffect, useState } from 'react'
import { API, AppContext } from '../AppContext'
import { toast } from 'react-toastify'

import '../Styling/EnterDisplayName.css'

export default function EnterDisplayName(props) {
    const { state: contextState, dispatch } = useContext(AppContext)
    const [name, setName] = useState('')
    console.log(props)
    function handleJoinClick(e) {
        e.preventDefault()
        API.join(name, props.match.params.roomID)
        dispatch({ type: 'update-name', displayName: name })
    }
    function handleRejoinClick(e) {
        e.preventDefault()
        API.join(name, props.match.params.roomID)
        dispatch({ type: 'update-name', displayName: name})
        dispatch({ type: 'remove-from-kicked', userId: contextState.userId})
    }

    if(contextState.kicked.includes(contextState.userId) === true)
    {
        return (
            <div className="create-page">
                <div className="p-4 m-4">
                    <h4 className="display-name">
                        Display Name <span className="required">*</span>
                    </h4>
                    <h6>
                        Sorry you've been kicked by an admin! Please enter your name again to log back in!
                    </h6>
                    <br />
                    <form onSubmit={handleRejoinClick}>
                        <input
                            type="text"
                            id="displayName"
                            placeholder="Enter Display Name"
                            class="form-control"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />{' '}
                        <br />
                        <button type="submit" className="btn btn-primary btn-lg generate-btn" onClick={handleRejoinClick}>
                            Join Room
                        </button>
                    </form>
                </div>
            </div>
        )
    }
    else
    {
        return (
            <div className="create-page">
                <div className="p-4 m-4">
                    <h4 className="display-name">
                        Display Name <span className="required">*</span>
                    </h4>
                    <br />
                    <form onSubmit={handleJoinClick}>
                        <input
                            type="text"
                            id="displayName"
                            placeholder="Enter Display Name"
                            class="form-control"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />{' '}
                        <br />
                        <button type="submit" className="btn btn-primary btn-lg generate-btn" onClick={handleJoinClick}>
                            Join Room
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
