import React, { useEffect, useMemo, useState } from 'react'
import PostsCard from '../PostsCard';
import FileUploadModal from '../FileUploadModal';
import { useLocation } from 'react-router-dom';
import { getSingleStatus, getSingleUser,editProfile, getStatus } from '../../../api/FirestoreAPI';
import { HiOutlinePencil } from 'react-icons/hi'
import { uploadImage as uploadImageAPI } from '../../../api/ImageUpload';
import defaultUser from '../../../assets/user.png'
import './index.scss'


function ProfileCard({ currentUser, onEdit }) {
    let location = useLocation();

    
    const [allStatuses, setAllStatus] = useState([]);
    const [currentProfile, setCurrentProfile] = useState({});
    const [currentImage, setCurrentImage] = useState({});
    const [progress, setProgress] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    


    //getting images from the bucket created in database
    const getImage = (event) => {
        setCurrentImage(event.target.files[0])
    }

    const uploadImage = () => {
        uploadImageAPI(
            currentImage, 
            currentUser.id, 
            setModalOpen, 
            setProgress, 
            setCurrentImage
        );

    };

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
        <FileUploadModal 
            modalOpen={modalOpen} 
            setModalOpen={setModalOpen} 
            getImage={getImage} 
            uploadImage={uploadImage}
            currentImage={currentImage}
            progress={progress}
        />
        
            <div className='profile-card'>
                <div className='edit-btn'>
                    <HiOutlinePencil className='edit-icon' onClick={onEdit} />
                </div>

                <div className="profile-info">
                    <div>
                        <img 
                            className="profile-image" 
                            onClick={() => setModalOpen(true)}
                            src={
                                Object.values(currentProfile).length === 0 
                                ? currentUser.imageLink
                                : currentProfile?.imageLink
                            } 
                            alt="profile-image" 
                        />

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
                                ? `${currentUser.city}, ${currentUser.country}`
                                : `${currentProfile.city}, ${currentProfile.country}` }
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