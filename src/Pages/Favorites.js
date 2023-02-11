import React, { useEffect, useState } from 'react'
import PetsList from '../componants/PetsList'

import "../Styles/Favorites.css"
import noFavorites from "../attachments/images/noFavoritPets.svg"
import { useAuth } from '../Contexts/AuthContext'
import { useUser } from '../Contexts/UserContext'
import LoadingSpinner from '../componants/LoadingSpinner'
import { useNavigate } from 'react-router-dom'
import backImg from "../attachments/images/line-angle-back-icon.svg"


export default function Favorites() {

  const [isLoading, setIsLoading] = useState(true)

  const { getFavorites, favorites } = useUser()
  const { currentUser } = useAuth()

  const navigate = useNavigate()
  const toSearchPets = () => { navigate('/SearchPets') }

  async function setList() {
    await getFavorites(currentUser?.userId);
    setIsLoading(false);
  }

  useEffect(() => {
    setList()
  }, [])

  return (
    <div className='Favorites-page'>
      <div className='favorites-header'>
        <h1>Favorites</h1>
      </div>
      <div className='favorites-container-header'>
        <button className='backButton' onClick={toSearchPets}><img src={backImg} alt='backImg'></img></button>
        <h3>Go Back</h3>
      </div>
      <hr id="headerDiv"></hr>
      {isLoading
        ?
        <LoadingSpinner />
        :
        favorites.length > 0
          ?
          <div className='Favorites-container'>
            <div className='FavoritePets'>
              <PetsList petListToDisplay={favorites}/>
            </div>
          </div>
          :
          <img src={noFavorites} alt='noFavorites' id='noFavorites'></img>
      }
    </div>
  )
}
