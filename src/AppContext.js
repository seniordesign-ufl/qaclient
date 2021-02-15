import React, { useReducer } from "react";
export const AppContext = React.createContext()

const initialState = {
    userId: null,
    displayName: null,
    roomKey: null,
    posts: null
};
const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case 'join-room':
            return {
                ...state,
                roomKey: action.roomKey,
            };
        case 'update-name':
            return {
                ...state,
                displayName: action.displayName,
            }
        case 'update-user-id':
            return {
                ...state,
                userId: action.userId,
            }
        case 'update-posts':
            return {
                ...state,
                posts: action.posts
        }
    }
}
export function ContextProvider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}