import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import "../Styles/Users.css"

import backImg from "../attachments/images/line-angle-back-icon.svg"
import UsersList from '../componants/UsersList'
import { useUser } from '../Contexts/UserContext'

export default function Users() {

  const navigate = useNavigate()
  const goBack = () => { navigate(-1) }


  const { allUsers, getAllUsers } = useUser()

  useEffect(() => {
    getAllUsers();
  }, [])


  return (
    <div>
      <div className='users-page'>
        <div className='users-header'>
          <h3 className='users-header-h3'>Users</h3>
        </div>
        <div className='users-container-header'>
          <button className='backButton' onClick={goBack}><img src={backImg} alt='backImg'></img></button>
          <h3>Go Back</h3>
        </div>
        <hr id="headerDiv"></hr>
        <div className='users-container'>
          <div className='allUsers'>
            {allUsers[0] ? <UsersList UsersListToDisplay={allUsers} /> : <h1 id='server_error'>No users</h1>}
          </div>
        </div>
      </div>
    </div>
  )
}
