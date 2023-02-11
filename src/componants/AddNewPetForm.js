import React, { useRef, useState } from 'react'

import "../Styles/Forms.css"
import { usePet } from '../Contexts/PetContext';

export default function AddNewPetForm({ setIsOpen, petInfo }) {

    const { postAddNewPet, getAllPets, updatePet } = usePet();

    const [editForm, setEditForm] = useState({
        name: petInfo?.name,
        type: petInfo?.type,
        weight: petInfo?.weight,
        height: petInfo?.height,
        color: petInfo?.color,
        hypoallergenic: petInfo?.hypoallergenic,
        breed: petInfo?.breed,
        dietery: petInfo?.dietery,
        bio: petInfo?.bio
    })
    const [petImage, setPetImage] = useState('');

    function handleImageUpload(e) {
        setPetImage(e.target.files[0]);
    }


    const nameRef = useRef();
    const typeRef = useRef();
    const weightRef = useRef();
    const heightRef = useRef();
    const colorRef = useRef();
    const hypoallergenicRef = useRef();
    const breedRef = useRef();
    const dieteryRef = useRef();
    const bioRef = useRef();

    const handleAddPet = async (e) => {
        e.preventDefault();

        const petFormData = new FormData();
        petFormData.append('picture', petImage)
        petFormData.append('name', nameRef.current?.value)
        petFormData.append('type', typeRef.current?.value)
        petFormData.append('height', heightRef.current?.value)
        petFormData.append('weight', weightRef.current?.value)
        petFormData.append('color', colorRef.current?.value)
        petFormData.append('hypoallergenic', hypoallergenicRef.current?.value)
        petFormData.append('breed', breedRef.current?.value)
        petFormData.append('dietery', dieteryRef.current?.value)
        petFormData.append('bio', bioRef.current?.value)

        const res = await postAddNewPet(petFormData);
        if (res) {
            getAllPets();
            setIsOpen(false)
        }
    };


    function handleKeyDown(e) {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight + 5}px`;
        e.target.style.height = `${Math.min(e.target.scrollHeight, 135)}px`;
    }



    function handleEditPet(e) {
        setEditForm({
            ...editForm, [e.target.id]: e.target.value
        })
    }

    async function handleSubmitPetEdit(e) {
        e.preventDefault();
        const petFormDataEdited = new FormData();
        petFormDataEdited.append('picture', petImage)
        petFormDataEdited.append('name', nameRef.current?.value)
        petFormDataEdited.append('type', typeRef.current?.value)
        petFormDataEdited.append('height', heightRef.current?.value)
        petFormDataEdited.append('weight', weightRef.current?.value)
        petFormDataEdited.append('color', colorRef.current?.value)
        petFormDataEdited.append('hypoallergenic', hypoallergenicRef.current?.value)
        petFormDataEdited.append('breed', breedRef.current?.value)
        petFormDataEdited.append('dietery', dieteryRef.current?.value)
        petFormDataEdited.append('bio', bioRef.current?.value)

        const res = await updatePet(petFormDataEdited,petInfo._id)
        if (res) {
            getAllPets();
            setIsOpen(false)
        }
    }


    return (
        <div className='container'>
            <div className='card'>
                <button className='exitBtn' onClick={() => { setIsOpen(false) }}></button>
                <h3>{petInfo ? 'Edit' : 'Add'} Pet</h3>
                <form className='form' onSubmit={petInfo ? handleSubmitPetEdit : handleAddPet}>
                    <div className='smallInput'>
                        <label>
                            <p>Name</p>
                            <input id='name' ref={nameRef} value={editForm?.name} onChange={handleEditPet} type='text' required></input>
                        </label>
                        <label>
                            <p>Type</p>
                            <select ref={typeRef} required>
                                <option value={'Dog'}>Dog</option>
                                <option value={'Cat'}>Cat</option>
                            </select>
                        </label>
                    </div>
                    <div className='smallInput'>
                        <label>
                            <p>Height</p>
                            <input id='height' ref={heightRef} value={editForm?.height} onChange={handleEditPet} type='number' required></input>
                        </label>
                        <label>
                            <p>Weight</p>
                            <input id='weight' ref={weightRef} value={editForm?.weight} onChange={handleEditPet} type='number' required></input>
                        </label>
                    </div>
                    <div className='smallInput'>
                        <label>
                            <p>Color</p>
                            <input id='color' ref={colorRef} value={editForm?.color} onChange={handleEditPet} type='text' required></input>
                        </label>
                        <label>
                            <p>Hypoallergenic</p>
                            <select id='hypoallergenic' ref={hypoallergenicRef} value={editForm?.hypoallergenic} onChange={handleEditPet} required>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                            </select>
                        </label>
                    </div>
                    <div className='smallInput'>
                        <label>
                            <p>Breed</p>
                            <input id='breed' ref={breedRef} value={editForm?.breed} onChange={handleEditPet} type='text' required></input>
                        </label>
                        <label>
                            <p>Dietary restrictions</p>
                            <input id='dietery' ref={dieteryRef} value={editForm?.dietery} onChange={handleEditPet} type='text'></input>
                        </label>
                    </div>
                    <label>
                        <p>Bio</p>
                        <textarea id='bio' ref={bioRef} value={editForm?.bio} onChange={handleEditPet} type='text' onKeyDown={handleKeyDown}></textarea>
                    </label>
                    <label id='imageInput'>
                        <p>Upload Pet Photo</p>
                        <input type='file' accept='img/*' onChange={handleImageUpload}></input>
                    </label>
                    <input className='submitButton' type='submit' value={petInfo ? 'Edit' : 'Add'}></input>
                </form>
            </div>
        </div>
    )
}
