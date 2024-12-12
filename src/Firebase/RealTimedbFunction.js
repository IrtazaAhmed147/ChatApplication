import { ref, get } from "firebase/database";
import {  dbApp } from "./Firebase";

export const fetchUserLastOnlineTime = async (userName) => {
    const userStatusRef = ref(dbApp, `status/${userName}`);
  
    try {
      const snapshot = await get(userStatusRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data.state === "offline") {
          return `Last active: ${new Date(data.last_changed).toLocaleString()}`;
        } else {
          return "Online now";
        }
      } else {
        return "User status not available";
      }
    } catch (error) {
      console.error("Error fetching user status:", error);
      return "Error fetching status";
    }
  };
