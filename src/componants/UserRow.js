import React, { useState } from 'react'
import Mail from "../attachments/images/MailIcon.svg"
import Phone from "../attachments/images/PhoneIcon.svg"
import Role from "../attachments/images/roleIcon.svg"
import { useNavigate } from 'react-router-dom'
import { useUser } from '../Contexts/UserContext'

export default function UserRow({ user }) {

    const navigate = useNavigate()
    const toUserPage = () => { navigate(`/UserProfile_admin?id=${user._id}`) }

    const {makeAdmin} = useUser()
    
    const [showMore, setShowMore] = useState(false)

    function handleMakeAdmin() {
        if (window.confirm("Do you want to make this user admin?")) {
            makeAdmin(user._id)
            console.log(`${user.first_name} is admin now`);
        } else {
            console.log(`didnt make ${user.first_name} an admin`);
        }
    }

    return (
        <>
            <div id='userNameRow'>{`${user?.first_name} ${user?.last_name}`}</div>
            <div id='userEmailRow'>
                <img className='rowIcon' src={Mail} alt='rowIcon'></img>
                <div className='rowDetails'>
                    <div id='emailTitle'>Email</div>
                    <div id='email'>{user?.email}</div>
                </div>
            </div>
            <div id='userPhoneRow'>
                <img className='rowIcon' src={Phone} alt='rowIcon'></img>
                <div className='rowDetails'>
                    <div id='phoneTitle'>Phone</div>
                    <div id='phone'>{user?.phone}</div>
                </div>
            </div>
            <div id='userRoleRow'>
                <img className='rowIcon' src={Role} alt='rowIcon'></img>
                <div className='rowDetails'>
                    <div id='roleTitle'>Role</div>
                    <div id='role'>{user?.user_role}</div>
                </div>
            </div>
            <div id='userMoreInfobutton' onClick={() => { setShowMore(!showMore) }} onMouseLeave={() => setShowMore(false)}>
                {showMore ?
                    <>
                        <div className='triangle'>
                            <div className='triangle-top-right'></div>
                        </div>
                        <div className='dropDownMore' style={{ fontSize: '14px' }}>
                            <div id='showUserPage' onClick={toUserPage}>Full info</div>
                            <div id='MakeAdmin' onClick={handleMakeAdmin}>Make admin</div>
                        </div>
                    </>
                    :
                    ''
                }

            </div>
        </>
    )
}
