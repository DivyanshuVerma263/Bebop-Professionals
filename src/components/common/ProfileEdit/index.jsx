import React, { useState } from 'react'
import { editProfile } from '../../../api/FirestoreAPI';
import { AiOutlineClose } from 'react-icons/ai'
import './index.scss'

function ProfileEdit({ currentUser, onEdit }) {
    // currentUser object provides the user data to be displayed as value
    const [editInputs, setEditInputs] = useState(currentUser);

    //function used to get input to edit
    const getInput = (event) => {
        let { name, value } = event.target;

        let input = { [name]: value };

        //spread operator used to use previous value and then the new one
        setEditInputs({ ...editInputs, ...input });
    };

    //function to update the data
    const updateProfileData = async () => {
        // console.log(currentUser);
        // passing the user id first and then the data to edit
        await editProfile(currentUser?.id, editInputs);
        await onEdit();
    }
    return (
        <div className='profile-card'>

            <div className='edit-btn'>
                <AiOutlineClose className='close-icon' onClick={onEdit} size={25}/>
                {/* <button >Go back</button> */}
            </div>

            <div className='profile-edit-inputs'>

                <label>Name</label>
                <input
                    onChange={getInput}
                    className="common-input"
                    placeholder="Name"
                    name="name"
                    value={editInputs.name}
                />

                <label>Headline</label>
                <input
                    onChange={getInput}
                    className="common-input"
                    placeholder="Headline"
                    value={editInputs.headline}
                    name="headline"
                />

                <label>Country</label>
                <input
                    onChange={getInput}
                    className="common-input"
                    placeholder="Country"
                    name="country"
                    value={editInputs.country}
                />

                <label>City</label>
                <input
                    onChange={getInput}
                    className="common-input"
                    placeholder="City"
                    name="city"
                    value={editInputs.city}
                />

                <label>Company</label>
                <input
                    onChange={getInput}
                    className="common-input"
                    placeholder="Company"
                    value={editInputs.company}
                    name="company"
                />
                
                <label>Industry </label>
                <input
                    onChange={getInput}
                    className="common-input"
                    placeholder="Industry"
                    name="industry"
                    value={editInputs.industry}
                />

                <label>College</label>
                <input
                    onChange={getInput}
                    className="common-input"
                    placeholder="College"
                    name="college"
                    value={editInputs.college}
                />

                <label>Website</label>
                <input
                    onChange={getInput}
                    className="common-input"
                    placeholder="Website"
                    name="website"
                    value={editInputs.website}
                />

                <label>About</label>
                <textarea
                    placeholder="About Me"
                    className="common-textArea"
                    onChange={getInput}
                    rows={5}
                    name="aboutMe"
                    value={editInputs.aboutMe}
                />

                <label>Skills</label>
                <input
                    onChange={getInput}
                    className="common-input"
                    placeholder="Skill"
                    name="skills"
                    value={editInputs.skills}
                />

            </div>
            <div className="save-container">
                <button className='save-btn' onClick={updateProfileData}>Save</button>
            </div>
        </div>
    )
}

export default ProfileEdit