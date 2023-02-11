import React, { useEffect, useRef, useState } from 'react'
import "../Styles/SearchPets.css"

import PetsList from '../componants/PetsList'
import plusIcon from '../attachments/images/plusIcon.svg'

import AddNewPetForm from '../componants/AddNewPetForm';
import Modal from "../componants/Modal"
import LoadingSpinner from "../componants/LoadingSpinner"

import { usePet } from '../Contexts/PetContext'
import { useAuth } from '../Contexts/AuthContext';
import { useUser } from '../Contexts/UserContext';

export default function SearchPets() {
  const { allPets, getAllPets, setSavedList } = usePet()
  const { currentUser, verifyUser, setLoginModal } = useAuth()
  const { userByID, getUserByID, getFavorites } = useUser();

  const [addPetOpen, setAddPetOpen] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState(false);

  const nameSearchRef = useRef();
  const typeFilterRef = useRef();
  const sizeFilterRef = useRef();
  const statusFilterRef = useRef();


  function handleSearch(e) {
    const searchReq = {
      name: nameSearchRef.current?.value,
      type: typeFilterRef.current?.value,
      size: sizeFilterRef.current?.value,
      status: statusFilterRef.current?.value
    }
    getAllPets(searchReq)
  }


  useEffect(() => {
    getAllPets()
    verifyUser()
    onLoad()
    getFavorites(currentUser?.userId)
  }, [addPetOpen])

  function onLoad() {
    getUserByID(currentUser?.userId)
    setSavedList(userByID?.saved_pets)
  }

  return (
    <div>
      <div className='pets-page'>
        <div className='Pets-header'>
          <h1>Pets</h1>
          {(currentUser.user_role === "admin") ? <button id='addPetButton' onClick={() => { setAddPetOpen(true) }}><img src={plusIcon} alt="plusIcon" id='plusIcon'></img>Add New</button> : ''}
        </div>
        <div className='pets-container'>
          <div className='container-header'>
            <h3>Our Adoption List</h3>
            <div className='searchAndAddInput-container'>
              <small className='advanced' onClick={() => setAdvancedSearch(!advancedSearch)}>{advancedSearch ? "Basic Search" : "Advanced Search"}</small>
              <div className='searchAndAdvanced'>
                <label >
                  <select ref={typeFilterRef}>
                    <option value={''} selected disabled >Type</option>
                    <option value={'Dog'}>Dog</option>
                    <option value={'Cat'}>Cat</option>
                    <option value={''}>All</option>
                  </select>
                </label>
                <div className='advancedSettings' style={{ display: advancedSearch ? "flex" : "none" }}>
                  <label>
                    <select ref={sizeFilterRef}>
                      <option value={''} selected disabled>Size</option>
                      <option value={'L'}>Large</option>
                      <option value={'M'}>Medium</option>
                      <option value={'S'}>Small</option>
                      <option value={''}>All</option>
                    </select>
                  </label>
                  <label>
                    <select ref={statusFilterRef}>
                      <option value={''} selected disabled>Adoption Status</option>
                      <option value={'Available'}>Available</option>
                      <option value={'Fostered'}>Fostered</option>
                      <option value={'Adopted'}>Adopted</option>
                      <option value={''}>All</option>
                    </select>
                  </label>
                </div>
                <div className='textInputAndButton' style={{ display: advancedSearch ? "flex" : "none" }}>
                  <input type='text' ref={nameSearchRef} placeholder='Search Pet...'></input>
                </div>
                <button id='addPetButton' onClick={handleSearch}>Search</button>
              </div>
            </div>

          </div>
          <hr id="headerDiv"></hr>
          <div className='allPets'>
            {allPets[0] ? <PetsList petListToDisplay={allPets} setLoginModal={setLoginModal} /> : <LoadingSpinner />}
          </div>
        </div>
      </div>
      {addPetOpen ? <Modal setIsOpen={setAddPetOpen}><AddNewPetForm setIsOpen={setAddPetOpen} status={'Add'} /></Modal> : ''}
    </div>
  )
}
