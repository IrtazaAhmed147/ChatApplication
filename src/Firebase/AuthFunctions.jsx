import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "./Firebase";
import { setUserAction } from "../Actions/AuthAction";

// Function to create a user
export const createUser = async (email, password, userName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: userName });


    console.log("User created successfully:", {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    }); // User signed up successfully
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    }

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(`Error Code: ${errorCode}, Message: ${errorMessage}`);
  }
};



export const checkUser = (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
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
    console.log(user)
    return user

  } catch (error) {
    console.log(error)
  }

}
export const signOutUser = async () => {
  try {
    await signOut(auth)


  } catch (error) {
    console.log(error)
  }

}


