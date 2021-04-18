import React, { useContext, useEffect } from 'react'
import { API, AppContext } from '../AppContext'
import '../Styling/index.css'

//Components

import Header from '../components/Header'
import EnterDisplayName from './EnterDisplayName'
import RoomHomeScreen from './RoomHomeScreen'
import context from 'react-bootstrap/esm/AccordionContext'

function Room(props) {
    const { state: contextState, dispatch } = useContext(AppContext)

    //Sets room key for users joining from link
    useEffect(() => {
        if (contextState.displayName !== null && contextState.roomKey === null) {
            dispatch({ type: 'join-room', roomKey: props.match.params.roomID })
            API.join(contextState.displayName, props.match.params.roomID)
        }
    }, [])

    return (
        <div className="room-page">
            {contextState.joinSuccess && <Header roomKey={contextState.roomKey} />}
            {contextState.displayName !== null && contextState.joinSuccess ? <RoomHomeScreen /> : <EnterDisplayName {...props} />}
        </div>
    )

}

export default Room
