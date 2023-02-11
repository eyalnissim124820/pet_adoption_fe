import React, { useEffect, useState } from 'react'
import { Outlet, NavLink, useNavigate } from "react-router-dom";

import petsLogo from "../attachments/images/petsLogo.svg"
import myPetsLogo from "../attachments/images/MypetsLogo.svg"
import favoritePetsLogo from "../attachments/images/favoriteIcon.svg"
import UsersPhoto from "../attachments/images/Users.svg";

import "../Styles/NavigationBar.css"
import { useAuth } from '../Contexts/AuthContext'

import Modal from './Modal'
import LoginSignup from './LoginSignup'


export default function NavigationBarManu() {
    const { currentUser, setCurrentUser, verifyUser, loginModal, setLoginModal} = useAuth();

    useEffect(() => {
        verifyUser()
    }, [])

    const navigate = useNavigate()
    const toSearchPets = () => { navigate('/SearchPets') }

    const handleLogOut = (e) => {
        localStorage.clear('token');
        setCurrentUser('')
        toSearchPets()
    }

    return (
        <div className='NavigationManu-container'>
            <ul className='navigation-buttons'>
                <NavLink activeclassname="active" className='linkButton' to="/SearchPets"><img src={petsLogo} alt='petsLogo'></img><p>Pets</p></NavLink>
                {currentUser && (<>
                    <NavLink activeclassname="active" className='linkButton' to="/MyPets"><img src={myPetsLogo} alt='myPetsLogo'></img><p>My Pets</p></NavLink>
                    <NavLink activeclassname="active" className='linkButton' to="/Favorites"><img src={favoritePetsLogo} alt='favoritePetsLogo'></img><p>Favorites</p></NavLink>

                    {(currentUser.user_role === "admin") && <NavLink activeclassname="active" className='linkButton' to="/Users"><img src={UsersPhoto} alt='favoritePetsLogo'></img><p>Users</p></NavLink>}
                </>)}
            </ul>
            <div className='userDisplay'>
                {loginModal ? <Modal setIsOpen={setLoginModal}><LoginSignup setIsOpen={setLoginModal} /></Modal> : ''}
                {(!currentUser) ?
                    <button className='LogInButton' onClick={() => setLoginModal(true)}>Log in</button>
                    :
                    <>
                        <div className='userInfo'>
                            <NavLink activeclassname="active" className='linkButton' id='userProfileButton' to="/UserProfile">
                                <p className='welcomeName'>Hi <b>{currentUser.user_name}</b>, Welcome <br /><b id='transUnderline'>___</b>To <b>Pet With Benefits</b></p>
                            </NavLink>
                        </div>
                        <div className='logOutButton-container'>
                            <button className='logOutButton' onClick={handleLogOut}>Log Out</button>
                        </div>
                    </>
                }
            </div>
            <Outlet />
        </div>
    )
}
