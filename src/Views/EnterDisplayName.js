import { React, useContext, useEffect, useState } from 'react'
import { API, AppContext } from '../AppContext'

import '../Styling/EnterDisplayName.css'

export default function EnterDisplayName(props) {
    const { state: contextState, dispatch } = useContext(AppContext)
    const [name, setName] = useState('')
    console.log(props)
    function handleJoinClick(e) {
        e.preventDefault()
        API.join(contextState.displayName, props.match.params.roomID)
        dispatch({ type: 'update-name', displayName: name })
    }
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
