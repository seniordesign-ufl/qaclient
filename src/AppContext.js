import React, { useEffect } from 'react'
import produce from 'immer'
import socketIOClient from 'socket.io-client'

export const AppContext = React.createContext()

const INITIAL_STATE = {
    userId: null,
    displayName: null,
    roomKey: null,
    posts: [],
    users: [],
    admins: [],
    upVotes: [],
    search_phrase: '',
    filter_by: '',
    discussionName: '',
    admin: false,
    joinSuccess: false,
}
const reducer = produce((draft, action) => {
    console.log(action);
    switch (action.type) {
        case 'join-room':
            draft.roomKey = action.roomKey
            break
        case 'update-name':
            draft.displayName = action.displayName
            break
        case 'update-user-id':
            draft.userId = action.userId
            break
        case 'update-posts':
            draft.posts = action.posts
            break
        case 'update-users':
            draft.users = action.users
            break
        case 'update-admins':
            draft.admins = action.admins
            draft.admin = draft.admins.includes(draft.userId);
            break
        case 'update-search':
            draft.search_phrase = action.search_phrase
            break
        case 'update-filter':
            draft.filter_by = action.filter_by
            break
        case 'admin-granted':
            draft.admin = true
            break
        case 'update-upVotes':
            draft.upVotes = action.upVotes
            break
        case 'join-successful':
            draft.joinSuccess = action.join.joinSuccess
            draft.discussionName = action.join.discussionName
            break
        default:
            console.log('Unknown case? (', action.type, ')')
    }
}, INITIAL_STATE)

let socket = null

export const API = {
    join: (userName, groupID) => {
        socket.emit('join', { userName, groupID })
    },
    leave: (userName, groupID) => {
        socket.emit('leave', { userName, groupID })
    },
    requestRoom: (emailInfo) => {
        console.log(emailInfo);
        socket.emit('request-room', {emailInfo})
    },
    createPost: (post, groupID) => {
        socket.emit('create-post', { post, groupID })
    },
    updatePost: (postUpdate, groupID) => {
        socket.emit('update-post', { postUpdate, groupID })
    },
    updatePinned: (postUpdate, groupID) => {
        socket.emit('update-post-pinned', { postUpdate, groupID })
    },
    updateSolved: (postUpdate, groupID) => {
        socket.emit('update-post-solved', { postUpdate, groupID })
    },
    removePost: (postID, groupID) => {
        socket.emit('remove-post', { postID, groupID })
    },
    addComment: (comment, postID, groupID) => {
        socket.emit('add-comment', { comment, postID, groupID })
    },
    updateComment: (commentUpdate, groupID) => {
        socket.emit('update-comment', { commentUpdate, groupID })
    },
    removeComment: (removeComment, groupID) => {
        socket.emit('remove-comment', { removeComment, groupID })
    },
    updateAdmin: (user, groupID) => {
        socket.emit('make-admin', { user, groupID })
    },
    demoteAdmin: (user, groupID) => {
        socket.emit('demote-admin', {user, groupID})
    }
}

const socketEvents = (dispatch) => {
    socket.on('client-id', (client_id) => {
        const cid = localStorage.getItem('client-id')
        if (cid) {
            console.log('rejoin attempt', cid)
            socket.emit('rejoin', { client_id: cid, pathname: window.location.pathname })
            socket.once('rejoin', (m) => {
                console.log(m)
                if (m.error) {
                    localStorage.setItem('client-id', client_id)
                    dispatch({ type: 'update-user-id', userId: client_id })
                } else {
                    if (window.location.pathname === '') {
                        window.location.replace(`/room/${m.groupID}`)
                    }
                    dispatch({
                        type: 'update-name',
                        displayName: m.username.name,
                    })
                    dispatch({ type: 'update-user-id', userId: m.username.id })
                    dispatch({ type: 'update-users', users: m.users })
                    dispatch({ type: 'update-posts', posts: m.posts })
                    dispatch({ type: 'update-admins', admins: m.admins })
                }
            })
            dispatch({ type: 'update-user-id', userId: client_id })
        } else {
            localStorage.setItem('client-id', client_id)
            dispatch({ type: 'update-user-id', userId: client_id })
        }
    })

    socket.on('join-successful', (discussionName) => {
        const join = {
            joinSuccess: true,
            discussionName: discussionName
        }
        dispatch({type: 'join-successful', join})
        console.log("join", discussionName)
    })
    socket.on('room-code', (roomCode) => {
        dispatch({ type: 'join-room', roomKey: roomCode })
        console.log('Socket event roomcode:', roomCode)
    })
    socket.on('update-users', ({ users }) => {
        dispatch({ type: 'update-users', users: users })
        console.log('Socket event update-users:', users)
    })
    socket.on('update-posts', ({ posts, groupID }) => {
        dispatch({ type: 'update-posts', posts: posts })
        console.log('Socket event update-posts:', posts)
        // if (groupID === contextState.roomKey)
        //     handleClose();
        // console.log(contextState.posts)
    })
    socket.on('get-admins', ({ groupID, admins }) => {
        dispatch({ type: 'update-admins', admins: admins })
        console.log("Socket event update-admins: ", admins)
    })
    socket.on('admin', () => {
        dispatch({ type: 'admin-granted' })
        console.log('Admin mode unlocked (ง •̀_•́)ง')
    })
    socket.on('error', (m) => console.log(m))
}
export const initSockets = (dispatch) => {
    console.log('init socket', process.env)
    socket = socketIOClient(process.env.REACT_APP_SIGNAL_URL)
    socketEvents(dispatch)
}

export function ContextProvider({ init, children }) {
    const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)
    useEffect(() => init(dispatch), [init])
    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}
