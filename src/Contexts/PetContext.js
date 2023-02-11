import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const PetContext = React.createContext();

export function usePet() {
    return useContext(PetContext);
}



export function PetContextProvider({ children }) {

    const [allPets, setAllPets] = useState([]);
    const [savedList, setSavedList] = useState();
    const [petByID, setPetByID] = useState();


    async function getAllPets(filters) {
        if (filters) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/pets/filters`, filters);
                setAllPets(response.data)
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pets`);
                setAllPets(response.data)
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function getPetByID(id) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pets/${id}`);
            setPetByID(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    async function getPetFullInfo(id) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pets/${id}`);
            return response.data;
        } catch (error) {
            console.log(error)
        }

    }

    async function postAddNewPet(petToPost) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/pets`, petToPost);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async function deletePetByID(id) {
        try {
            axios.delete(`${process.env.REACT_APP_SERVER_URL}/pets/${id}`)
        } catch (error) {
            console.log(error);
        }
    }

    async function savePet(userID, petID) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/pets/save`, { userID, petID });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    function checkIfSaved(array, petId) {
        for (let i = 0; i < array?.length; i++) {
            if (array[i] === petId) {
                return true
            }
        }
        return false
    }

    async function updatePet(pet,petId){
        try {
            const respones = await axios.put(`${process.env.REACT_APP_SERVER_URL}/pets/update/${petId}`, pet);
            return respones ? true : false
        } catch (error) {
            console.log(error);
        }
    }
 

    const value = {
        getAllPets,
        allPets,
        setAllPets,
        getPetByID,
        petByID,
        getPetFullInfo,
        postAddNewPet,
        deletePetByID,
        savePet,
        checkIfSaved,
        setSavedList,
        savedList,
        updatePet
    }

    return (
        <>
            <PetContext.Provider value={value}>
                {children}
            </PetContext.Provider>
        </>
    )
}




