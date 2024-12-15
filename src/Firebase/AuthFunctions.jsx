import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, dbApp } from "./Firebase";
import { setUserAction } from "../Actions/AuthAction";
import { onDisconnect, ref, set } from "firebase/database";

// Function to create a user
export const createUser = async (email, password, userName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: userName });


    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      
    }

  } catch (error) {

    throw new Error(error.message);
  }
};



export const checkUser = (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
     

        const userStatusRef = ref(dbApp, `status/${user.displayName}`);

        // Set the user's status to online
        set(userStatusRef, {
          state: "online",
          last_changed: Date.now(),
        });
  
        // Set the user's status to offline when they disconnect
        onDisconnect(userStatusRef).set({
          state: "offline",
          last_changed: Date.now(),
        });
  

      dispatch(setUserAction({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        
      }));
    } else {
      // User is signed out
      dispatch(setUserAction(null));
    }
  });
};



export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
   
    return user

  } catch (error) {
    throw new Error(error.message);
  }

}
export const signOutUser = async () => {
  try {
    await signOut(auth)


  } catch (error) {
    console.log(error)
  }

}


