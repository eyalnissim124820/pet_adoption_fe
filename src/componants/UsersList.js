import React from 'react'

import { Howl, Howler } from 'howler';
import hover from '../attachments/hover3.mp3'

import "../Styles/UsersList.css"
import UserRow from './UserRow'

export default function UsersList({ UsersListToDisplay }) {

    const sound = new Howl({
        src: [hover]
    })
    Howler.volume(0.8)
    return (
        <>
            <ul className='listOfUsers'>
                {
                    UsersListToDisplay?.map((user) => (
                        <li key={user?._id} className='userRow'><UserRow user={user} onMouseEnter={() => sound.play()} /></li>
                    ))
                }
            </ul>
        </>
    )
}
