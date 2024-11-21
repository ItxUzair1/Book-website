import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,signOut
} from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB3C622O1kIO6oWgMhoXm8UA52mH5aomYk",
    authDomain: "mini-project-39ab3.firebaseapp.com",
    projectId: "mini-project-39ab3",
    storageBucket: "mini-project-39ab3.firebasestorage.app",
    messagingSenderId: "1080842761437",
    appId: "1:1080842761437:web:80aa5fbd998b50b5c39734"
};

const provider = new GoogleAuthProvider();
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FirebaseContext = createContext(null);
const db = getFirestore(app);
export const useFirebase = () => useContext(FirebaseContext);

const auth = getAuth(app);

export default function FirebaseProvider({ children }) {
    const SignInWithGoogle = () => {
        return signInWithPopup(auth, provider);
    };

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    const isLogged = user ? true : false;

    const SignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const AddBook = (name, isbn, price, cover) => {
        return addDoc(collection(db, 'books'), {
            name,
            price,
            isbn,
            cover,
            createdAt: new Date()
        });
    };

    const fetchBooks=async ()=>{
        return await getDocs(collection(db,'books'));
    }

    const fetchSpecificBook = async (id) => {
        // Reference the specific document
        const ref = doc(db, 'books', id);
        // Fetch the document
        const bookSnap = await getDoc(ref);
      
        if (bookSnap.exists()) {
          return bookSnap.data(); // Return document data
        } else {
          throw new Error("No such document!");
        }
      };
      

    const SignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const SignOut=async ()=>{
        return await signOut(auth);
    }

    return (
        <FirebaseContext.Provider value={{ SignUp, SignIn,SignOut, isLogged, SignInWithGoogle, AddBook,fetchBooks,fetchSpecificBook }}>
            {children}
        </FirebaseContext.Provider>
    );
}
