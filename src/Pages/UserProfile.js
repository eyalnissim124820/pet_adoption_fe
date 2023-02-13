import React, { useEffect, useState } from 'react'

import "../Styles/userProfile.css"
import userPhotoIcon from "../attachments/images/userPhotoIcon.svg"
import { useUser } from '../Contexts/UserContext'
import { useAuth } from '../Contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

import backImg from "../attachments/images/line-angle-back-icon.svg"


export default function UserProfile() {

    const { userByID, getUserByID, updateUser } = useUser()
    const { currentUser, verifyUser, setCurrentUser } = useAuth()

    const [userInfo, setUserInfo] = useState(userByID)

    const navigate = useNavigate()
    const goBack = () => { navigate(-1) }

    function handleChange(e) {
        setUserInfo({
            ...userInfo, [e.target.id]: e.target.value
        })
    }
    function handleOnSubmit(e) {
        e.preventDefault()
        updateUser(userInfo)
        setCurrentUser({
            ...currentUser, user_name: userInfo.first_name
        })
    }

    async function onLoad() {
        await getUserByID(currentUser)
        setUserInfo(userByID)
    }

    useEffect(() => {
        verifyUser()
        onLoad()
    }, [])

    return (
        <div className='userProfile-page'>
            <div className='userProfile-header'>
                <h1>Profile</h1>
            </div>
            <div className='favorites-container-header'>
                <button className='backButton' onClick={goBack}><img src={backImg} alt='backImg'></img></button>
                <h3>Go Back</h3>
            </div>
            <hr id="headerDiv"></hr>
            <div className='userProfile-container'>
                <img src={userPhotoIcon} alt="userPhotoIcon"></img>
                <form className='form' onSubmit={handleOnSubmit}>
                    <div className='smallInput'>
                        <label>
                            <p>First Name</p>
                            <input id='first_name' type='text' value={userInfo?.first_name} onChange={handleChange} required></input>
                        </label>
                        <label>
                            <p>Last Name</p>
                            <input id='last_name' type='text' value={userInfo?.last_name} onChange={handleChange} required></input>
                        </label>
                    </div>
                    <label>
                        <p>Email</p>
                        <input id='email' type='email' value={userInfo?.email} onChange={handleChange} required></input>
                    </label>
                    <label>
                        <p>Phone Number</p>
                        <input id='phone' type='tel' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={handleChange} value={userInfo?.phone} required></input>
                    </label>
                    <input className='submitButton' type='submit' value='Save Changes' ></input>
                </form>
            </div>
        </div>
    )
}
