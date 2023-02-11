import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from '../Contexts/AuthContext';

import PWBLogo from "../attachments/PWB icon2.svg"
import PWBtext from "../attachments/Pets WithBenefits.svg"

import "../Styles/MainDashboard.css"
import NavigationBar from "../componants/NavigationBar"
import MyPets from "./MyPets"
import SearchPets from "./SearchPets"
import Favorites from "./Favorites"
import Users from "./Users"
import UserProfile from './UserProfile';
import PetPage from './PetPage';
import LandingPage from './LandingPage';
import UserProfile_admin from './UserProfile_admin';


export default function MainDashboard() {
    const { currentUser } = useAuth()

    return (
        <BrowserRouter>
            <div className='page-mainDashboard'>
                <div className='naviagtion-bar'>
                    <div className='appLogo-container'>
                        <img src={PWBLogo} alt="PWBlogo" id='PWBlogo'></img>
                        <img src={PWBtext} alt="PWBtext" id='PWBtext'></img>
                    </div>
                    <hr className="solid"></hr>
                    <NavigationBar />
                </div>
                <div className='main-container'>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="LandingPage" element={<LandingPage />} />
                        <Route path="SearchPets" element={<SearchPets />} />
                        <Route path="MyPets" element={currentUser ? <MyPets /> : <SearchPets />} />
                        <Route path="Favorites" element={currentUser ? <Favorites /> : <SearchPets />} />
                        <Route path="Users" element={currentUser.user_role === 'admin' ? <Users /> : <SearchPets />} />
                        <Route path="UserProfile" element={currentUser ? <UserProfile /> : <SearchPets />} />
                        <Route path="PetPage" element={<PetPage />} />
                        <Route path="UserProfile_admin" element={currentUser.user_role === 'admin' ? < UserProfile_admin /> : <SearchPets />} />
                    </Routes>
                </div>
            </div >
        </BrowserRouter>
    )
}


