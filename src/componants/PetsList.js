import React from 'react'

import "../Styles/PetsList.css"
import PetCard from "../componants/PetCard"

export default function PetsList({ petListToDisplay }) {


    return (
        <ul className='listOfUserPets'>
            {
                petListToDisplay.map((Pet) => (
                    <li key={Pet._id} ><PetCard petData={Pet} /></li>
                ))
            }
        </ul>
    )
}
