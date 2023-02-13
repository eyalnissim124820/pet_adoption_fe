import React, { useEffect, useState } from 'react'

import "../Styles/MyPets.css"
import emptyPets from "../attachments/images/oopsNoPets.svg"
import PetsList from '../componants/PetsList'
import { useNavigate } from 'react-router-dom'
import backImg from "../attachments/images/line-angle-back-icon.svg"
import { useUser } from '../Contexts/UserContext'
import { useAuth } from '../Contexts/AuthContext'
import LoadingSpinner from '../componants/LoadingSpinner'



export default function MyPets() {

  const navigate = useNavigate()
  const goBack = () => { navigate(-1) }


  const [petList, setPetList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { getUsersPets } = useUser()
  const { currentUser } = useAuth()


  async function setMyPets() {
    const list = await getUsersPets(currentUser.userId)
    await setPetList(list)
    setIsLoading(false)
  }

  useEffect(() => {
    setMyPets()
  }, [])




  return (
    <div className='MyPets-page'>
      <div className='myPets-header'>
        <h1>My Pets</h1>
      </div>
      <div className='favorites-container-header'>
        <button className='backButton' onClick={goBack}><img src={backImg} alt='backImg'></img></button>
        <h3>Go Back</h3>
      </div>
      <hr id="headerDiv"></hr>
      {isLoading ?
        <LoadingSpinner />
        :
        petList[0]
          ?
          <div className='MyPets-container'>
            <div className='userPets'>
              <PetsList petListToDisplay={petList} />
            </div>
          </div>
          :
          <img src={emptyPets} alt='emptyPets' id='emptyPets'></img>
      }
    </div>
  )
}
