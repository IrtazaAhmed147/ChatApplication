import { addDoc, collection,  onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "./Firebase";

export const sendMessage = async (SenderId, RecieverId, msg) => {
  console.log("SenderId:", SenderId, "RecieverId:", RecieverId);

  try {

    const sender = SenderId.toLowerCase();
    const receiver = RecieverId.toLowerCase();

    // Generate unique chatId
    const chatId = sender < receiver
      ? `${sender}_${receiver}`
      : `${receiver}_${sender}`;


    const docRef = await addDoc(collection(db, `chats/${chatId}/messages`), {
      SenderId,
      RecieverId,
      message: msg,
      time: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e
  }
}


export const getMessages = async (SenderId, RecieverId, callback) => {
  try {
    const sender = SenderId.toLowerCase();
    const receiver = RecieverId.toLowerCase();

    // Generate unique chatId
    const chatId = sender < receiver
      ? `${sender}_${receiver}`
      : `${receiver}_${sender}`;

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