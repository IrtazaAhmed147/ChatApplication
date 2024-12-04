import { collection, addDoc } from "firebase/firestore"; 
import { db } from "./Firebase";


export const demoFunc = async(email, userName, name, userUid)=> {

    try {
      const docRef = await addDoc(collection(db, "Users"), {
        userName,
        name,
        email,
        userUid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}