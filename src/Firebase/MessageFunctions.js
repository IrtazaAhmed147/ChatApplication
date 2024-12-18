import { addDoc, collection,  deleteDoc,  doc,  getDocs,  onSnapshot, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "./Firebase";

export const sendMessage = async (SenderId, RecieverId, msg) => {

  try {


    // Generate unique chatId
    const chatId = SenderId.uid < RecieverId.userUid
      ? `${SenderId.uid}_${RecieverId.userUid}`
      : `${RecieverId.userUid}_${SenderId.uid}`;


   await addDoc(collection(db, `chats/${chatId}/messages`), {
      SenderId: SenderId.displayName,
      RecieverId : RecieverId.userName,
      message: msg,
      time: serverTimestamp(),
      seen: false,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e
  }
}


export const getMessages = async (SenderId, RecieverId, callback) => {
  try {
    const chatId = SenderId.uid < RecieverId.userUid
    ? `${SenderId.uid}_${RecieverId.userUid}`
    : `${RecieverId.userUid}_${SenderId.uid}`;


    // Reference to the messages collection
    const messagesRef = collection(db, `chats/${chatId}/messages`);

    // Listen to real-time updates
    const unsubscribe = onSnapshot(messagesRef, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          ...doc.data(), // Include document data
        });
      });

      // Use callback to send the messages back to the caller
      callback(messages);
    });

    // Return the unsubscribe function to stop listening when no longer needed
    return unsubscribe;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
}

  export const latestMsgSend = async(recieverId, senderId)=> {
 
    try {
      const friendsRef = collection(db, 'Users', recieverId, 'Friends');      
      const q = query(friendsRef, where('userName',  '==', senderId))
      const snapshot = await getDocs(q);
      
        snapshot.forEach(async(docSnap)=> {
          const messageRef = doc(db, 'Users', recieverId, 'Friends', docSnap.id);
          await updateDoc(messageRef, { lastMessageSeen: false, lastMessageGet: serverTimestamp() });
        })
      
    } catch (error) {
      throw error
    }

  }

export const deletMsg = async (SenderId,RecieverId,id) => {
  try {

    const chatId = SenderId.uid < RecieverId.userUid
    ? `${SenderId.uid}_${RecieverId.userUid}`
    : `${RecieverId.userUid}_${SenderId.uid}`;


    const delRef = doc(db, `chats/${chatId}/messages`, id)
    const res = await deleteDoc(delRef)
    return res
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const isNewChat = async(recieverId, senderId)=> {


  try {
    const friendsRef = collection(db, 'Users', senderId, 'Friends');      
    const q = query(friendsRef, where('userName',  '==', recieverId.userName))
    const snapshot = await getDocs(q);
    
      snapshot.forEach(async(docSnap)=> {
        const messageRef = doc(db, 'Users', senderId, 'Friends', docSnap.id);
        await updateDoc(messageRef, { lastMessageSeen: true, });
      })
    
  } catch (error) {
    console.log(error)
  }
}

export const markMessageAsSeen = async(SenderId, RecieverId, currUser)=> {
  try {

    
    const chatId = SenderId.uid < RecieverId.userUid
    ? `${SenderId.uid}_${RecieverId.userUid}`
    : `${RecieverId.userUid}_${SenderId.uid}`;


        const messagesRef = collection(db, `chats/${chatId}/messages`);
        const q = query(messagesRef, where('RecieverId',  '==', currUser), where('seen', "==", false))

        onSnapshot(q, (snapshot)=> {
          snapshot.docs.forEach(async(docSnap)=> {
            const messageRef = doc(db, `chats/${chatId}/messages`, docSnap.id);
            await updateDoc(messageRef, { seen: true });
          })
        })
  } catch (error) {
    throw error
  }
  
}