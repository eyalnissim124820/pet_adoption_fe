import React, { useEffect, useState } from 'react'
import { useUser } from '../Contexts/UserContext';
import "../Styles/UserProfileAdmin.css"
import PetsList from "../componants/PetsList"
import LoadingSpinner from '../componants/LoadingSpinner';
import backImg from "../attachments/images/line-angle-back-icon.svg"
import { useNavigate } from 'react-router-dom';


export default function UserProfileAdmin() {

    const URL = new URLSearchParams(window.location.search)
    const userId = URL.get('id');

    const [userInfo, setUserInfo] = useState({})
    const [userPets, setUserPets] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { getUserByIdToDisplay, getUsersPets } = useUser()

    const navigate = useNavigate()
    const goBack = () => { navigate(-1) }
  
    useEffect(() => {
        loadData(userId)
    }, [])

    async function loadData(id) {
        const user = await getUserByIdToDisplay(id)
        setUserInfo(user)
        const list = await getUsersPets(id)
        setUserPets(list)
        setIsLoading(false)
    }


    return (
        <>

            {
                userInfo
                    ?
                    <div className='userProfile-page'>
                        <div className='userProfile-header'>
                            <h1>{userInfo?.first_name}'s details</h1>
                        </div>
                        <div className='favorites-container-header'>
                            <button className='backButton' onClick={goBack}><img src={backImg} alt='backImg'></img></button>
                            <h3>Go Back</h3>
                        </div>
                        <hr id="headerDiv"></hr>
                        <div className='userProfile-container-admin'>
                            <form className='form'>
                                <div className='smallInput'>
                                    <label>
                                        <p>First Name</p>
                                        <p id='info'>{userInfo?.first_name}</p>
                                    </label>
                                    <label>
                                        <p>Last Name</p>
                                        <p id='info'>{userInfo?.last_name}</p>
                                    </label>
                                </div>
                                <div className='smallInput'>
                                    <label>
                                        <p>Email</p>
                                        <p id='info'>{userInfo?.email}</p>
                                    </label>
                                    <label>
                                        <p>Phone Number</p>
                                        <p id='info'> {userInfo?.phone}</p>
                                    </label>
                                </div>
                            </form>
                            <div className='usersPetsTitle'><p>Pets</p></div>
                            <hr className='lineDiv' id="headerDiv"></hr>
                            <div className='userProfilePets'>
                                {isLoading ?
                                    <LoadingSpinner />
                                    :
                                    userPets[0] ? < PetsList petListToDisplay={userPets} />
                                        :
                                        `No pets owned by ${userInfo?.first_name} ${userInfo?.last_name}`
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div></div>
            }
        </>
    )
}
