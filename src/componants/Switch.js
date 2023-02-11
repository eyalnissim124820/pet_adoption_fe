import React from 'react';
import '../Styles/Switch.css';

const Switch = ({ signInMode, toggle }) => {
    const logInMode = {
        left: 'calc(-0% - 2px)',
        transform: 'translateX(0%)'
    }
    const signUpMode = {
        left: 'calc(100% - 2px)',
        transform: 'translateX(-100%)'
    }
    return (
        <>
            <input className="react-switch-checkbox" id={`react-switch-new`} type="checkbox" onClick={(e) => { e.stopPropagation(); signInMode() }} />
            <label className="react-switch-label" htmlFor={`react-switch-new`}>
                <small>Sign up</small> <small>Log In</small>
                <span className={`react-switch-button`} style={toggle ? signUpMode : logInMode} />
            </label>
        </>
    );
};

export default Switch;