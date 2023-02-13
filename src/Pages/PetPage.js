import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePet } from '../Contexts/PetContext'
import { useAuth } from '../Contexts/AuthContext'
import { useUser } from '../Contexts/UserContext'

import "../Styles/PetPage.css"

import LoadingSpinner from '../componants/LoadingSpinner'
import StatusTag from "../componants/StatusTag"
import Modal from "../componants/Modal"
import PetForm from "../componants/AddNewPetForm"

import noDogPhoto from '../attachments/images/noDogPhoto.png'
import noCatPhoto from '../attachments/images/noCatPhoto.png'
import edit from "../attachments/images/edit2.svg"
import backImg from "../attachments/images/line-angle-back-icon.svg"


export default function PetPage() {

    const URL = new URLSearchParams(window.location.search)
    const petId = URL.get('id');


    const { getPetByID, petByID, deletePetByID, savePet, checkIfSaved } = usePet();
    const { currentUser, verifyUser, setLoginModal } = useAuth()
    const { userByID, getUserByID, adoptPet, fosterPet, returnPet } = useUser()

    const [editModal, setEditModal] = useState(false);
    const [actionModal, setActionModal] = useState(false)

    const [isSaved, setIsSaved] = useState(false)
    const [isMine, setIsMine] = useState(false)


    const navigate = useNavigate()
    const toSearchPets = () => { navigate('/SearchPets') }
    const goBack = () => { navigate(-1) }
    const toMyPets = () => { navigate('/MyPets') }

    function handleSaveFav() {
        if (currentUser) {
            setIsSaved(!isSaved);
            savePet(currentUser?.userId, petByID._id)
        } else {
            setLoginModal(true)
        }
    }

    async function checkIfPetMine() {
        const adopted = userByID.adopted_pets;
        const fostered = userByID.fostered_pets;
        if ((adopted.includes(petByID._id)) || (fostered.includes(petByID._id))) {
            setIsMine(true)
        }
    }

    async function getIsSaved() {
        setIsSaved(checkIfSaved(userByID?.saved_pets, petByID?._id))
    }

    async function handleAdopt() {
        const res = await adoptPet(currentUser, petByID);
        if (res) {
            setActionModal(true)
        }
        getPetByID(petId);
    }

    function handleFoster() {
        fosterPet(currentUser, petByID)
        getPetByID(petId);
    }

    function handleReturn() {
        returnPet(currentUser, petByID);
        getPetByID(petId);
    }

    function handleDelete() {
        if (window.confirm("Delete the item?")) {
            deletePetByID(petByID._id);
            toSearchPets();
            console.log('deleted!');
        } else {
            console.log(`didn't delete`);
        }
    }

    const photoURL = petByID ? (petByID.picture ? petByID.picture : (petByID.type === 'Dog' ? noDogPhoto : noCatPhoto)) : '';
    useEffect(() => {
        verifyUser();
        getUserByID(currentUser.userId);
        getPetByID(petId);
        getIsSaved();
        checkIfPetMine()
    }, [])

    return (
        <>
            {
                petByID ?
                    <div className='Pet-page'>
                        <div className='Pets-header'>
                            <h3 className='Pets-header-h3'>Pet's Page</h3>
                        </div>
                        <div className='PetPage-container-header'>
                            <button className='backButton' onClick={goBack}><img src={backImg} alt='backImg'></img></button>
                            <h3>Go Back</h3>
                            <div className='petStatusAndFavorit'>
                                {currentUser.user_role === "admin" ? <img src={edit} alt='' className='edit' onClick={() => { setEditModal(true) }} /> : ""}
                                <StatusTag status={petByID.adoptionStatus} />
                                <div className={`petPagefav-${isSaved}`} onClick={(e) => { handleSaveFav() }}></div>
                            </div>
                        </div>
                        <hr id="headerDiv"></hr>
                        <div className='PetPage-container'>
                            <div className='PetBigPic'>
                                <img src={photoURL} alt='tempImg'></img>
                            </div>
                            <div className='petCardBody'>
                                <div className='PetAllInfo'>
                                    <div className='petBio'>
                                        <div id='petName'>My Name is <h3>{petByID.name}</h3></div>
                                        <p>{petByID?.bio}</p>
                                    </div>
                                    <ul className='petSpec'>
                                        <li><h3>Type: </h3><p>{petByID.type}</p></li>
                                        <li><h3>Height:</h3><p>{petByID.height}</p></li>
                                        <li><h3>Weight:</h3><p>{petByID.weight}</p></li>
                                        <li><h3>Color:</h3><p>{petByID.color}</p></li>
                                        <li><h3>Hypoallergenic:</h3><p>{petByID.hypoallergnic ? 'Yes' : 'No'}</p></li>
                                        <li><h3>Breed:</h3><p>{petByID.breed}</p></li>
                                        <li><h3>Dietary restrictions:</h3><p>{petByID.dietery ? petByID.dietery : 'None'}</p></li>
                                    </ul>
                                </div>
                                <div className='petButtons'>
                                    <div>

                                        {currentUser.user_role === "admin" ? <button className='deletePet' onClick={handleDelete}>Delete Pet</button> : ""}
                                    </div>
                                    {
                                        currentUser ?
                                            <div >
                                                {isMine ? <button className='returnButton' onClick={handleReturn}>Return</button> : ''}
                                                <button className='fosterButton' onClick={handleFoster} style={(petByID?.adoptionStatus === "Adopted" || petByID?.adoptionStatus === "Fostered") ? { display: 'none' } : {}}>Foster</button>
                                                <button className='adoptButton' onClick={handleAdopt} style={(petByID?.adoptionStatus === "Adopted" || petByID?.adoptionStatus === "Fostered") ? { display: 'none' } : {}}>Adopt</button>
                                            </div>
                                            :
                                            ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div> :
                    <LoadingSpinner />
            }
            {
                editModal ?
                    <Modal setIsOpen={setEditModal}>
                        <PetForm setIsOpen={setEditModal} petInfo={petByID} />
                    </Modal>
                    :
                    ''
            }
            {
                actionModal ?
                    <Modal setIsOpen={setActionModal}>
                        <div className='adoptedAlert'>
                            <div>

                                <div className='aa-title'>
                                    {petByID.adoptionStatus === 'Adopted' || petByID.adoptionStatus === 'Fostered' ?
                                        `congratulations`
                                        :
                                        `We sorry to hear`
                                    }
                                </div>
                                <div className='aa-body'>
                                    {
                                        petByID.adoptionStatus === 'Adopted' ?
                                            `You adopted ${petByID.name} as new friend for life!`
                                            :
                                            petByID.adoptionStatus === 'Fostered' ?
                                                `You fostered ${petByID.name}!`
                                                :
                                                `You returend ${petByID.name}`
                                    }
                                </div>
                            </div>
                            <div className='aa-button' onClick={toMyPets}>Go to my pets</div>
                        </div>
                    </Modal>
                    : ''
            }
        </>

    )
}