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
    console.log(contextState.displayName, contextState.joinSuccess);

    //Sets room key for users joining from link
    useEffect(() => {
        if(contextState.roomKey === null && props.match.params.roomID) {
            dispatch({ type: 'join-room', roomKey: props.match.params.roomID })
        }
        if (contextState.displayName !== null && contextState.roomKey === null) {
            API.join(contextState.displayName, props.match.params.roomID)
        }
    }, [])

    return (
        <div className="room-page">
            {contextState.joinSuccess && <Header roomKey={contextState.roomKey} />}
            {contextState.displayName !== null && contextState.joinSuccess ? (
                <RoomHomeScreen />
            ) : (
                <EnterDisplayName {...props} />
            )}
        </div>
    )
}

export default Room
