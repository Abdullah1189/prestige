/* eslint-disable react/prop-types */
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    setPersistence,
    browserSessionPersistence,
  } from "firebase/auth";
  import { app } from "../firebase/firebase.config";
  import { createContext, useEffect, useState } from "react";
  
  export const AuthContext = createContext(null);
  
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    // Configure Firebase Auth to use session persistence
    useEffect(() => {
      const configurePersistence = async () => {
        try {
          await setPersistence(auth, browserSessionPersistence); // Use session persistence
        } catch (error) {
          console.error("Error setting persistence:", error);
        }
      };
  
      configurePersistence();
  
      const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false); // Stop loading after auth state is determined
      });
  
      return () => {
        unSubscribe();
      };
    }, []);
  
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const signInWithGoogle = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
    };
  
    const signIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const logOut = () => {
      setLoading(true);
      return signOut(auth);
    };
  
    const authInfo = {
      user,
      loading,
      createUser,
      signInWithGoogle,
      signIn,
      logOut,
    };
  
    return (
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthProvider;
  