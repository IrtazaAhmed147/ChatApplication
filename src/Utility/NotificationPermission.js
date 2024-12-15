import { getToken } from "firebase/messaging";
import { dbApp, dbMsg } from "../Firebase/Firebase";
import { get, ref, set } from "firebase/database";


export const requestFunction = async (user) => {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
        try {
            const token = await getToken(dbMsg, { vapidKey: 'BJSq1reD8X2LlNaA1cgGdWcGNMfu_HoJeD65JGFGbMHL-nm97Nf9sY-GeXlfDvZTIGfYngH9kMlDBnfmuf7zjs0' })

            if (token) {

                // Check if the user already has a token in the database
                const userRef = ref(dbApp, `users/${user}`);
                const snapshot = await get(userRef);

                if (snapshot.exists()) {
                    // If token already exists, update it only if it's different
                    const existingData = snapshot.val();
                    if (existingData.token !== token) {
                        set(userRef, { user, token })
                            .then(() => console.log('Token updated successfully'))
                            .catch((error) => console.log('Error updating token:', error));
                    }
                } else {
                    // If user doesn't have a token, set it
                    set(userRef, { user, token })
                        .then(() => console.log('Token stored successfully'))
                        .catch((error) => console.log('Error storing token:', error));
                }
            }
        } catch (error) {
            console.log(error)
        }

    } 

}