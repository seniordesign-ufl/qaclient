import React, { useReducer } from "react";
import produce from "immer"

export const AppContext = React.createContext()

const INITIAL_STATE = {
    userId: null,
    displayName: null,
    roomKey: null,
    posts: null
};
const reducer = produce((draft, action) => {
    switch (action.type) {
        case 'join-room':
            draft.roomKey = action.roomKey;
        case 'update-name':
            draft.displayName = action.displayName;
        case 'update-user-id':
            draft.userId = action.userId;
        case 'update-posts':
            draft.posts = action.posts;
    }

}, INITIAL_STATE)

export function ContextProvider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}