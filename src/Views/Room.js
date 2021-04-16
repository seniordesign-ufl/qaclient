import React, { useContext, useEffect } from 'react'
import { API, AppContext } from '../AppContext'
import '../Styling/index.css'

//Components

import Header from '../components/Header'
import EnterDisplayName from './EnterDisplayName'
import RoomHomeScreen from './RoomHomeScreen'

function Room(props) {
    const { state: contextState, dispatch } = useContext(AppContext)

    //Sets room key for users joining from link
    useEffect(() => {
        dispatch({ type: 'join-room', roomKey: props.match.params.roomID })
        if (contextState.displayName !== null) {
            API.join(contextState.displayName, props.match.params.roomID)
        }
    }, [])

    if(contextState.kicked === true)
    {
        dispatch({type: 'join-successful', joinSuccess: false})
        dispatch({ type: 'update-name', displayName: '' })
        return (
            <div className="room-page">
                {contextState.joinSuccess && <Header roomKey={contextState.roomKey} />}
                {contextState.displayName !== null && contextState.joinSuccess ? <RoomHomeScreen /> : <EnterDisplayName {...props} kicked={true}/>}
            </div>
        )
    }
    else
    {
        return (
            <div className="room-page">
                {contextState.joinSuccess && <Header roomKey={contextState.roomKey} />}
                {contextState.displayName !== null && contextState.joinSuccess ? <RoomHomeScreen /> : <EnterDisplayName {...props} kicked={false}/>}
            </div>
        )
    }

}

export default Room
