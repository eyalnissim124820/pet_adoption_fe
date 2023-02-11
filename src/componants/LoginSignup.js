import React, { useState } from 'react'

import "../Styles/LoginSignup.css"
import "../Styles/Forms.css"

import Login from "./Login"
import SignUp from "./SignUp"
import Switch from "./Switch"
import { useAuth } from '../Contexts/AuthContext'


export default function AuthBar({ setIsOpen }) {
    const [toggle, setToggle] = useState(true);

    function signInMode() {
        setToggle(!toggle)
    }

    return (
        <div className='container'>
            <div className='card'>
                <button className='exitBtn' onClick={() => { setIsOpen(false) }}></button>
                <div id='switch-container' ><Switch signInMode={signInMode} setToggle={setToggle} toggle={toggle} /></div>
                {toggle ? <Login setIsOpen={setIsOpen}  /> : <SignUp setIsOpen={setIsOpen} setToggle={setToggle}/>}
            </div>
        </div>
    )
}
