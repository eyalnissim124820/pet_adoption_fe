import React, { useContext, useState } from 'react';
import axios from 'axios';

const AppContext = React.createContext();
const BASE_URL = "http://localhost:8080";

export function useApp() {
    return useContext(AppContext);
}



export function AppContextProvider({ children }) {

    const [allPets, setAllPets] = useState([])
    const [petByID, setPetByID] = useState()

    async function getAllPets() {
        const response = await axios.get(`${BASE_URL}/pets`);
        setAllPets(response.data)
    }

    async function getPetByID(id) {
        const response = await axios.get(`${BASE_URL}/pets/${id}`);
        setPetByID(response.data)
    }

    async function postAddNewPet(petToPost) {
        const response = axios.post(`${BASE_URL}/pets`, petToPost);
        return response;
    }

    async function deletePetByID(id) {
        axios.delete(`${BASE_URL}/pets/${id}`)
    }

    const [allUsers, setAllUsers] = useState([])

    async function getAllUsers() {
        const response = await axios.get(`${BASE_URL}/users`);
        setAllUsers(response.data)
    }

    const value = {
        getAllPets,
        allPets,
        setAllPets,
        getPetByID,
        petByID,
        postAddNewPet,
        deletePetByID,
        allUsers,
        getAllUsers
    }

    return (
        <>
            <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
        </>
    )
}




