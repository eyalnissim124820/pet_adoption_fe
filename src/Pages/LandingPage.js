import React, { useState } from 'react'

import WelcomeText from "../attachments/Welcome To Your New Lover..svg"
import welcomeImg from "../attachments/images/Cat-And-Dog.svg"

import LoginSignup from "../componants/LoginSignup"
import "../Styles/LandingPage.css"

import Modal from '../componants/Modal'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
    const [signInModalIsOpen, setSignIIsOpen] = useState(false);

    const navigate = useNavigate()
    const toSearchPets = () => { navigate('/SearchPets') }

    function handleSkip() {
        toSearchPets()
    }
    function handleOpen() {
        setSignIIsOpen(true)
    }

    return (
        <div className='page-landingPage'>
            <div className='landing-container'>
                <img src={WelcomeText} className='welcomeText' alt='welcomeText'></img>
                <div className='chooseAuth'>
                    <button className='skipAuth' onClick={handleSkip}>Skip</button>
                    <button onClick={handleOpen}>Login</button>
                </div>
                <img src={welcomeImg} className='welcomeImg' alt='welcomeImg'></img>
                {signInModalIsOpen ? <Modal setIsOpen={setSignIIsOpen}>
                    <LoginSignup setIsOpen={setSignIIsOpen}/>
                </Modal> : ''}
            </div>
        </div>
    )
}
