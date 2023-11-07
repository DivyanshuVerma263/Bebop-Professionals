import { signInWithEmailAndPassword , getAuth} from 'firebase/auth';
import { auth } from '../firebaseConfig';
// contains data for authentication throughout the project
// const auth=getAuth();

export const LoginAPI = ( email ,password) => {
    try{
        signInWithEmailAndPassword(auth,email,password);
    }
    catch(err){
        console.log(err);
    }
}