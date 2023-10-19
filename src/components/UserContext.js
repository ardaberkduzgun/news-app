// UserContext.js
import React, { createContext, useContext, useReducer } from 'react';

const UserContext = createContext();

const initialState = {
    user: null,
    isLoggedIn: false,
};

const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload,
                isLoggedIn: true,
            };
        case 'LOGOUT':
            return initialState;
        case 'REGISTER':
            return {
                user: action.payload,
                isLoggedIn: true,
            };
        default:
            return state;
    }
};
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};



