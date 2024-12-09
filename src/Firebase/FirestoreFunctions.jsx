import { collection, addDoc, getDocs, serverTimestamp, where, query, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "./Firebase";
import { demoUser } from "../Actions/AuthAction";


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


export const getUserName = async (dispatch) => {
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

    if(dispatch) {

      dispatch(demoUser(users))
    }


    // Return the users array
    return users;
  } catch (error) {
    console.log(error.message)
  }


}




export const sendRequest = async (SenderId, RecieverId) => {
  console.log("SenderId:", SenderId, "RecieverId:", RecieverId);
  try {
    const docRef = await addDoc(collection(db, "FriendRequests"), {
      SenderId,
      RecieverId,
      status: 'Pending',
      time: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e
  }
}



export const getFriendRequests = async (userId) => {
  try {
    const q = query(
      collection(db, "FriendRequests"),
      where("RecieverId", "==", userId), // Only fetch requests where RecieverId matches the user
    );

    const querySnapshot = await getDocs(q);
    const invitations = [];

    querySnapshot.forEach((doc) => {
      invitations.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return invitations;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
export const getSendedRequest = async (userId) => {
  try {
    const q = query(
      collection(db, "FriendRequests"),
      where("SenderId", "==", userId), // Only fetch requests where RecieverId matches the user
    );

    const querySnapshot = await getDocs(q);
    const invitations = [];

    querySnapshot.forEach((doc) => {
      invitations.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return invitations;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};


export const rejectRequest = async (id) => {
  try {

    const delRef = doc(db, "FriendRequests", id)
    const res = await deleteDoc(delRef)
    return res
  } catch (error) {
    console.log(error)
    throw error
  }
}


export const addFriend = async (userId, user) => {
  try {
    const collectionRef = collection(db, 'Users', userId, 'Friends')
    const result = await addDoc(collectionRef, {
      userName: user.userName,
      name: user.name,
      userUid: user.userUid,
    })
    console.log(result)
  } catch (error) {
    console.log(error)
    throw error
  }
}


export const getFriendList = async (userId)=> {

  try {
    const collectionRef = collection(db, 'Users', userId, 'Friends')
    const result = await getDocs(collectionRef)

    return result
    
  } catch (error) {
    throw error
  }
}


