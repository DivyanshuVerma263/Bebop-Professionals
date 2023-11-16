import React, { useMemo, useState } from 'react'
import PostsCard from '../PostsCard';
import { useLocation } from 'react-router-dom';
import { getSingleStatus, getSingleUser, getStatus } from '../../../api/FirestoreAPI';
import { HiOutlinePencil } from 'react-icons/hi'
import './index.scss'


function ProfileCard({ currentUser, onEdit }) {
    let location = useLocation();
    const [allStatuses, setAllStatus] = useState([]);
    const [currentProfile, setCurrentProfile] = useState({});

    useMemo(() => {
        if (location?.state?.id) {
            getSingleStatus(setAllStatus, location?.state?.id);
        }

        if (location?.state?.email) {
            getSingleUser(setCurrentProfile, location?.state?.email);
        }
    }, []);


    return (
        <>
            <div className='profile-card'>
                <div className='edit-btn'>
                    <HiOutlinePencil className='edit-icon' onClick={onEdit} />
                </div>

                <div className="profile-info">
                    <div>

                        <h3 className='userName' >
                            {Object.values(currentProfile).length === 0
                                ? currentUser.name
                                : currentProfile?.name}
                        </h3>

                        <p className='heading'>
                            {Object.values(currentProfile).length === 0
                                ? currentUser.headline
                                : currentProfile?.headline}
                        </p>

                        <p className='location'>
                            {Object.values(currentProfile).length === 0
                                ? `${currentUser.location}, ${currentUser.country}`
                                : `${currentProfile.location}, ${currentProfile.country}` }
                        </p>

                        <a className='website'
                            target="_blank"
                            href={Object.values(currentProfile).length === 0
                                ? `${currentUser.website}`
                                : currentProfile?.website}
                        >
                            {Object.values(currentProfile).length === 0
                                ? `${currentUser.website}`
                                : currentProfile?.website}
                        </a>

                    </div>

                    <div className='right-info'>

                        <p className='college'>
                            {Object.values(currentProfile).length === 0
                                ? currentUser.college
                                : currentProfile?.college}
                        </p>
                        
                        <p className='company'>
                            {Object.values(currentProfile).length === 0
                                ? currentUser.company
                                : currentProfile?.company}
                        </p>
                    </div>
                </div>
                
                <p className='about-me'>
                    {Object.values(currentProfile).length === 0
                        ? currentUser.aboutMe
                        : currentProfile?.aboutMe}
                </p>
                
                <p className='skills'>
                    <span className='skill-label'>Skills</span>:&nbsp;
                    {Object.values(currentProfile).length === 0
                        ? currentUser.skills
                        : currentProfile?.skills}
                </p>
            </div>

            <div className='post-status-main'>
                {allStatuses.filter((item) => {
                    // to display the posts of only the logged in user
                    return item.userEmail === localStorage.getItem("userEmail")
                })
                    .map((posts) => {
                        console.log(posts);
                        return (
                            <>
                                <PostsCard posts={posts} />
                            </>
                        )
                    })}
            </div>

        </>
    )
}

export default ProfileCard