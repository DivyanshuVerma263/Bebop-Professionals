import { storage } from "../firebaseConfig";
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import { editProfile } from "./FirestoreAPI";



export const uploadImage = (file, id, setModalOpen, setProgress) => {
    
    const profilePicsRef=ref(storage, `profileImages/${file.name}`);
    
    //which file to be uploaded
    const uploadTask = uploadBytesResumable(profilePicsRef, file); 

    uploadTask.on('state_changed',
    (snapshot) => {
        // used to track progress
        // denotes the amount of bytes transferred out of total size of the file
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
        setProgress(progress);
    },
    
    (error)=>{
        console.error(error);
    }, 
    
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((response) => {
            editProfile(id, {imageLink: response}); //setting the image link
            setModalOpen(false); //close the modal
            setCurrentImage({});
            setProgress(0);
        });
    })

}