import { signInWithEmailAndPassword , 
        createUserWithEmailAndPassword,
        GoogleAuthProvider,
        signInWithPopup,
    } from 'firebase/auth';
import { auth } from '../firebaseConfig';
// contains data for authentication throughout the project
// const auth=getAuth();

// checking the registered user credentials
export const LoginAPI = ( email ,password) => {
    try{
        let response = signInWithEmailAndPassword(auth,email,password);
        return response;
    }
    catch(err){
        return err;
    }
};

// creating a user with received credentials
export const RegisterAPI = ( email ,password) => {
    try{
        let response = createUserWithEmailAndPassword(auth,email,password);
        return response;
    }
    catch(err){
        return err;
    }
};



export const GoogleSignInAPI = () => {
    try{
        let googleProvider = new GoogleAuthProvider();
        let response = signInWithPopup(auth,googleProvider)
        return response;
    }
    catch(err){
        return err;
    }
};
