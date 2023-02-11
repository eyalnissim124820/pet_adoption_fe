import React from 'react'

import "../Styles/UsersList.css"
import UserRow from './UserRow'

export default function UsersList({ UsersListToDisplay }) {

    return (
        <>
            <ul className='listOfUsers'>
                {
                    UsersListToDisplay.map((user) => (
                        <li key={user?._id} className='userRow'><UserRow user={user} /></li>
                    ))
                }
            </ul>
        </>
    )
}
