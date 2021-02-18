import React, { useEffect } from "react";
import produce from "immer"
import socketIOClient from "socket.io-client";

export const AppContext = React.createContext()

const INITIAL_STATE = {
    userId: null,
    displayName: null,
    roomKey: null,
    posts: [],
    users: [],
};
const reducer = produce((draft, action) => {
    switch (action.type) {
        case 'join-room':
            draft.roomKey = action.roomKey;
            break;
        case 'update-name':
            draft.displayName = action.displayName;
            break;
        case 'update-user-id':
            draft.userId = action.userId;
            break;
        case 'update-posts':
            draft.posts = action.posts;
            break;
        case 'update-users':
            draft.users = action.names;
            break;
    }

}, INITIAL_STATE)

const socket = socketIOClient("http://localhost:3000");

export const API = {
    join: (userName, groupID) => {
        socket.emit('join', { userName, groupID });
    },
    leave: (userName, groupID) => {
        socket.emit('leave', { userName, groupID });
    },
    requestRoom: () => {
        socket.emit('request-room');
    },
    createPost: (post, groupID) => {
        socket.emit('create-post', { post, groupID });
    },
    updatePost: (postUpdate, groupID) => {
        socket.emit('update-post', { postUpdate, groupID });
    }
}

const socketEvents = (dispatch) => {
    socket.on('room-code', (roomCode) => {
        dispatch({ type: "join-room", roomKey: roomCode });
        console.log("Socket event roomcode:", roomCode)
    });
    socket.on('update-users', ({ names }) => {
        dispatch({ type: "update-users", names });
        console.log("Socket event update-users:", names)
    });
    socket.on('update-posts', ({ posts, groupID }) => {
        dispatch({ type: 'update-posts', posts: posts })
        console.log("Socket event update-posts:", posts)
        // if (groupID === contextState.roomKey)
        //     handleClose();
        // console.log(contextState.posts)
    });
}
export const initSockets = (dispatch) => {
    socketEvents(dispatch);
};

export function ContextProvider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)
    useEffect(() => initSockets(dispatch), [initSockets])
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}