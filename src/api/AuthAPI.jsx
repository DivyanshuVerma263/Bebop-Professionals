import { signInWithEmailAndPassword , 
        createUserWithEmailAndPassword,
        GoogleAuthProvider,
        signInWithPopup,
        signOut
    } from 'firebase/auth';
// auth contains data for authentication throughout the project
import { auth } from '../firebaseConfig';


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


// google signin 
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

// logout
export const onLogout = () => {
    try{
        signOut(auth);
    }
    catch(err){
        return err;
    }
}