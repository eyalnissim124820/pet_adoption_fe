import React, { useRef, useState } from 'react'
import { useAuth } from "../Contexts/AuthContext"
import { useNavigate } from 'react-router-dom'

export default function NavigationBarSignUp({ setIsOpen, setToggle }) {

    const { signUpUser, login } = useAuth()


    const [errorMsg, setErrorMsg] = useState('')

    const navigate = useNavigate()
    const toSearchPets = () => { navigate('/SearchPets') }

    const first_nameRef = useRef()
    const last_nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const password_confirmRef = useRef()
    const phone_numberRef = useRef()


    async function handleSignUp(e) {
        e.preventDefault();
        const formRefs = {
            first_name: first_nameRef.current?.value,
            last_name: last_nameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            password_confirm: password_confirmRef.current?.value,
            phone: phone_numberRef.current?.value
        };
        if (passwordRef.current?.value === password_confirmRef.current?.value) {
            setErrorMsg('')
            try {
                const response = await signUpUser(formRefs);
                if (response) {
                    const tologin = {
                        email: emailRef.current?.value,
                        password: passwordRef.current?.value,
                    }
                    const log = await login(tologin)
                    if (log) {
                        setIsOpen(false)
                        toSearchPets()
                    }
                }
            } catch (error) {
                setErrorMsg(error.response.data);
            }
        } else {
            setErrorMsg('Passwords do NOT match');
        }
    }

    return (
        <>
            <div className='form-header'>
                <h3>Sign Up</h3>
                <small>{errorMsg}</small>
            </div>
            <form className='form' onSubmit={handleSignUp}>
                <div className='smallInput'>
                    <label>
                        <p>First Name</p>
                        <input ref={first_nameRef} type='text' required></input>
                    </label>
                    <label>
                        <p>Last Name</p>
                        <input ref={last_nameRef} type='text' required></input>
                    </label>
                </div>
                <label>
                    <p>Email</p>
                    <input ref={emailRef} type='email' required></input>
                </label>
                <div className='smallInput' required>
                    <label>
                        <p>Password</p>
                        <input ref={passwordRef} type='password' required></input>
                    </label>
                    <label>
                        <p>Confirm Password</p>
                        <input ref={password_confirmRef} type='password' required></input>
                    </label>
                </div>
                <label>
                    <p>Phone Number <small>(xxx-xxx-xxxx)</small></p>
                    <input ref={phone_numberRef} type='tel' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required></input>
                </label>
                <input className='submitButton' type='submit' value='Sign Up'></input>
            </form>
        </>
    )
}
