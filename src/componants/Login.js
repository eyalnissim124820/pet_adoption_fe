import { useRef, useState } from "react";
import { useAuth } from "../Contexts/AuthContext"
import { useNavigate } from "react-router-dom";

export default function NavigationBarLogin({ setIsOpen }) {

    const [errorMsg, setErrorMsg] = useState('');

    const { login } = useAuth();

    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate()
    const toSearchPets = () => { navigate('/SearchPets') }

    async function handleLogin(e) {
        e?.preventDefault();
        const loginRefs = {
            email: emailRef.current?.value,
            password: passwordRef.current?.value
        };
        setErrorMsg('')
        try {
            const loggedIn = await login(loginRefs);
            if (loggedIn) {
                toSearchPets()
                setIsOpen(false)
            }
        } catch (error) {
            console.log(error.response.data);
            setErrorMsg(error.response.data);
        }
    }

    return (
        <>
            <div className='form-header'>
                <h3>Log in</h3>
                <small>{errorMsg}</small>
            </div>
            <form className='form' onSubmit={handleLogin}>
                <label>
                    <p>Email</p>
                    <input ref={emailRef} type='email' required></input>
                </label>
                <label>
                    <p>Password</p>
                    <input ref={passwordRef} type='password' required></input>
                </label>
                <input className='submitButton' type='submit' value='Log in' onClick={(e) => { e.stopPropagation(); handleLogin() }}></input>
            </form>
        </>
    )
}
