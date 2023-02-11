import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const UserContext = React.createContext();
const BASE_URL = process.env.REACT_APP_SERVER_URL;

export function useUser() {
    return useContext(UserContext);
}



export function UserContextProvider({ children }) {
    const [allUsers, setAllUsers] = useState([])
    const [userByID, setUserByID] = useState()
    const [favorites, setFavorites] = useState([])

    const { currentUser } = useAuth()

    async function getAllUsers() {
        try {
            const response = await axios.get(`${BASE_URL}/users`);
            setAllUsers(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    async function getUserByID(id) {
        try {
            const response = await axios.get(`${BASE_URL}/users/${id}`);
            setUserByID(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    async function getUserByIdToDisplay(id) {
        try {
            const response = await axios.get(`${BASE_URL}/users/${id}`);
            return (response.data)
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteUserByID(id) {
        try {
            axios.delete(`${BASE_URL}/users/${id}`)
        } catch (error) {
            console.log(error);
        }
    }

    async function getFavorites(id) {
        try {
            const respones = await axios.get(`${BASE_URL}/users/favorites/${id}`);
            setFavorites(respones.data)
            return (respones.data);
        } catch (error) {
            console.log(error)
        }
    }

    async function getUsersPets(id) {
        try {
            const respones = await axios.post(`${BASE_URL}/users/userpets/${id}`);
            return (respones.data);
        } catch (error) {
            console.log(error)
        }
    }

    async function adoptPet(user, pet) {
        try {
            const respones = await axios.post(`${BASE_URL}/adopt?user=${user.userId}&&pet=${pet._id}`);
            return respones ? true : false
        } catch (error) {
            console.log(error);
        }
    }

    async function fosterPet(user, pet) {
        try {
            const dataToPost = { user, pet };
            const respones = await axios.post(`${BASE_URL}/users/foster/`, dataToPost);
            return respones ? true : false
        } catch (error) {
            console.log(error);
        }
    }

    async function returnPet(user, pet) {
        try {
            const dataToPost = { user, pet };
            const respones = await axios.post(`${BASE_URL}/users/return`, dataToPost);
            return respones ? true : false
        } catch (error) {
            console.log(error);
        }
    }

    async function updateUser(dataToUpdate) {
        try {
            const respones = await axios.put(`${BASE_URL}/users/${dataToUpdate._id}`, dataToUpdate);
            return respones ? true : false
        } catch (error) {
            console.log(error);
        }
    }
    async function makeAdmin(userId) {
        try {
            const respones = await axios.post(`${BASE_URL}/users/role?userId=${userId}`);
            return respones ? true : false;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserByID(currentUser);
    }, [])


    const value = {
        allUsers,
        getAllUsers,
        userByID,
        getUserByID,
        getUserByIdToDisplay,
        deleteUserByID,
        getFavorites,
        favorites,
        getUsersPets,
        adoptPet,
        fosterPet,
        returnPet,
        updateUser,
        makeAdmin
    }

    return (
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    )
}




