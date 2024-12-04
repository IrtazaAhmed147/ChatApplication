import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./Firebase";


export const demoFunc = async (email, userName, name, userUid) => {

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


export const getUserName = async () => {
  try {

    const querySnapshot = await getDocs(collection(db, "Users"));

    // Create an array to store users
    const users = [];

    // Loop through the documents and add them to the array
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),  // spread the document data
      });
    });

    // Return the users array
    return users;
  } catch (error) {
    console.log(error.message)
  }


}