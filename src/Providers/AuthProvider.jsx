import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import { createContext, useEffect, useState } from "react";
  import { auth } from "../firebase/firebase.config";
  
  export const AuthContext = createContext(null);
  
  const googleProvider = new GoogleAuthProvider();
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    const [loading, setLoading] = useState(true);
  
    const [gmailAddress, setGmailAddress] = useState("");

    console.log(user);
    
  
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password).finally(() =>
        setLoading(false)
      );
    };
  
    const updateUserProfile = (updatedData) => {
      setLoading(true);
      return updateProfile(auth.currentUser, updatedData);
    };
  
    const signOutUser = () => {
      setLoading(true);
      return signOut(auth);
    };
  
    const signInUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password).finally(() =>
        setLoading(false)
      );
    };
  
    const signInWithGoogle = () => {
      return signInWithPopup(auth, googleProvider);
    };
  
    const resetPassword = (email) => {
      return sendPasswordResetEmail(auth, email);
    };
  
    useEffect(() => {
      const unsubsribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
  
        // if (currentUser?.email) {
        //   const user = { email: currentUser.email };
  
        //   axios
        //     .post("https://marathon-hub-server-two.vercel.app/jwt", user, {
        //       withCredentials: true,
        //     })
        //     .then((res) => {
        //       setLoading(false);
        //     });
        // } else {
        //   axios
        //     .post(
        //       "https://marathon-hub-server-two.vercel.app/logout",
        //       {},
        //       {
        //         withCredentials: true,
        //       }
        //     )
        //     .then((res) => {
        //       setLoading(false);
        //     });
        // }

      });
  
      return () => {
        unsubsribe();
      };
    }, []);
  
    const authInfo = {
      user,
      setUser,
      createUser,
      updateUserProfile,
      signOutUser,
      signInUser,
      signInWithGoogle,
      gmailAddress,
      setGmailAddress,
      resetPassword,
      loading,
      setLoading,
    };
  
    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
  };
  
  export default AuthProvider;
  