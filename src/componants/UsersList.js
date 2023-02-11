import React from 'react'

import { Howl, Howler } from 'howler';
import hover from '../attachments/hover2.mp3'

import "../Styles/UsersList.css"
import UserRow from './UserRow'

export default function UsersList({ UsersListToDisplay }) {

    const sound = new Howl({
        src: [hover]
    })

    return (
        <>
            <ul className='listOfUsers' onMouseEnter={() => sound.play()} onMouseLeave={() => sound.pause()}>
                {
                    UsersListToDisplay?.map((user) => (
                        <li key={user?._id} className='userRow'><UserRow user={user} /></li>
                    ))
                }
            </ul>
        </>
    )
}
