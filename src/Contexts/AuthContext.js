import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loginModal, setLoginModal] = useState(false)

    async function signUpUser(userToPost) {
        try {
            const response = axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, userToPost);
            return response
        } catch (error) {
            return (error);
        }
    }

    async function login(loginRefs) {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, loginRefs);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token)
        }
        return response;
    }

    async function verifyUser() {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/token`, { headers: { authorization: `Bearer ${token}` } });
            await setCurrentUser(response.data)
            return (response.data)
        } catch (error) {
            return ("Not a user");
        }
    }

    useEffect(() => {
        verifyUser();
    }, [])


    const value = {
        currentUser,
        setCurrentUser,
        signUpUser,
        login,
        verifyUser,
        loginModal,
        setLoginModal
    }

    return (
        <>
            <AuthContext.Provider value={value}>
                {!isLoading && children}
            </AuthContext.Provider>
        </>
    )
}




