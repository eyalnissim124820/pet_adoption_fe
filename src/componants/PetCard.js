import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Howl, Howler } from 'howler';
import hover from '../attachments/hover2.mp3'

import "../Styles/PetCard.css"

import noDogPhoto from '../attachments/images/noDogPhoto.png'
import noCatPhoto from '../attachments/images/noCatPhoto.png'

import StatusTag from './StatusTag'
import { usePet } from '../Contexts/PetContext'
import { useAuth } from '../Contexts/AuthContext'
import { useUser } from '../Contexts/UserContext'

export default function PetCard({ petData }) {
    const { savePet, checkIfSaved } = usePet();
    const { currentUser, setLoginModal } = useAuth();
    const { userByID, getUserByID } = useUser();

    const sound = new Howl({
        src: [hover]
    })

    const [isSaved, setIsSaved] = useState(false)
    const [photoPlaceholder, setPhotoPlaceholder] = useState(noDogPhoto)

    const navigate = useNavigate()
    const toPetPage = () => { navigate(`/PetPage?id=${petData._id}`) }

    function handleSaveFav() {
        if (currentUser) {
            setIsSaved(!isSaved);
            savePet(currentUser?.userId, petData._id)
        } else {
            setLoginModal(true)
        }
    }

    async function getIsSaved() {
        await getUserByID(currentUser?.userId)
        setIsSaved(checkIfSaved(userByID.saved_pets, petData._id))
    }

    useEffect(() => {
        if ((!petData.picture) && (petData.type === 'Cat')) {
            setPhotoPlaceholder(noCatPhoto)
        }
        getIsSaved()
    }, [])


    Howler.volume(0.8)

    return (
        <div>
            <div className='petCard' onClick={toPetPage} onMouseEnter={() => sound.play()} >
                <div className='petPhoto'>
                    <div className={`favButton-${isSaved}`} onClick={(e) => { e.stopPropagation(); handleSaveFav() }}></div>
                    <img id='petPhotoImg' src={petData.picture ? petData.picture : photoPlaceholder} alt="petPhotoImg"></img></div>
                <div className='petCardInfo'>
                    <StatusTag status={petData.adoptionStatus} />
                    <p id='pName'>{petData.name}</p>
                </div>
                <div className='PetCard-footer'>
                    <button onClick={(e) => { e.stopPropagation(); toPetPage() }}>My Story</button>
                </div>
            </div>
        </div>
    )
}
