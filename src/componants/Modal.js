import React from 'react';

export default function Modal({ children, setIsOpen }) {


    const ModalStyle = {
        position: 'absolute',
        right: '25%',
        left: '25%',
        top: '15%',
        bottom: '25%',
        backgroundColor: 'transperant',
        zIndex: '1',
        margin:'0',
        padding:'0'
    }
    const ModalContainerStyle = {
        backgroundColor: "rgba(0,0,0,0.7)",
        position: 'absolute',
        width: "100vw",
        height: "100vh",
        top: '0',
        right: '0',
        zIndex: '2'
    }

    return (
        <div onClick={() => setIsOpen(false)} style={ModalContainerStyle}>
            <div className='modal' onClick={(e) => { e.stopPropagation();}} style={ModalStyle}>
                    {children}
            </div>
        </div>
    );
}


