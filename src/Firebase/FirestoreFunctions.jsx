import { collection, addDoc, getDocs, serverTimestamp, where, query, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { demoUser } from "../Actions/AuthAction";


export const demoFunc = async (email, userName, name, userUid) => {

  try {
    await addDoc(collection(db, "Users"), {
      userName,
      name,
      email,
      userUid,
      theme: 'light',
    });
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

export const updateTheme = async (userName)=> {
 
  try {
      const ref = collection(db, 'Users')
      
      const q = query(ref, where('userName',  '==', userName))
     
      const snapshot = await getDocs(q);
    const themeUpdates = snapshot.docs.map(async (docSnap) => {
      const userData = docSnap.data();
      const themeRef = doc(db, 'Users', docSnap.id);
      

      const newTheme = userData.theme === 'light' ? 'dark' : 'light';
      await updateDoc(themeRef, { theme: newTheme });

      return { theme: newTheme }; // Return updated theme
    });

    const themes = await Promise.all(themeUpdates); // Wait for all updates
   
    return themes;
            
  } catch (error) {
    throw error
  }

}

export const getTheme = async(userName)=> {

try {
  const ref = collection(db, 'Users')
      
      const q = query(ref, where('userName',  '==', userName))
    
      // const theme = []
      const snapshot = await getDocs(q);
             // Use Promise.all to resolve asynchronous logic properly
    const theme = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const userData = docSnap.data();
        return { theme: userData.theme };
      })
    );

    return theme;
} catch (error) {
  throw error
}
} 



export const sendRequest = async (SenderId, RecieverId) => {
  try {
    await addDoc(collection(db, "FriendRequests"), {
      SenderId,
      RecieverId,
      status: 'Pending',
      time: serverTimestamp(),
    });
  } catch (e) {
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
    throw error;
  }
};


export const rejectRequest = async (id) => {
  try {

    const delRef = doc(db, "FriendRequests", id)
    const res = await deleteDoc(delRef)
    return res
  } catch (error) {
    throw error
  }
}


export const addFriend = async (userId, user) => {
  try {
    const collectionRef = collection(db, 'Users', userId, 'Friends')
    await addDoc(collectionRef, {
      userName: user.userName,
      name: user.name,
      userUid: user.userUid,
      lastMessageGet: serverTimestamp(),
      lastMessageSeen: false

    })
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


