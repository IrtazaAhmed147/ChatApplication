// import { get, ref } from "firebase/database";
// import { dbApp, dbMsg } from "./Firebase";
// import { getMessaging } from "firebase/messaging";

// let registrationToken = null;
// export const getTokenFromDb = async (user, msg)=> {

//     const userStatusRef = ref(dbApp, `users/${user}`);
//     try {
//           const snapshot = await get(userStatusRef);
//           console.log(snapshot)
//           if (snapshot.exists()) {
//             const data = snapshot.val();
//             console.log(data)
//             registrationToken = data.token
//             console.log(registrationToken)
//             console.log(user)
//             console.log(msg)
//           } 
//           if (registrationToken) {
//             const messaging = {
//                 notification: {
//                     title: 'New Message',
//                     body: msg
//                 },
//                 token: registrationToken,
//             }
//             getMessaging().send(messaging)
//             .then((response) => {
//               // Response is a message ID string.
//               console.log('Successfully sent message:', response);
//             })
//             .catch((error) => {
//               console.log('Error sending message:', error);
//             });
//             // admin.messaging().send(messaging)
//             // .then((response) => {
//             //     console.log('Successfully sent message:', response);
//             // })
//             // .catch((error) => {
//             //     console.log('Error sending message:', error);
//             // });

//           }
//     } catch (error) {
//             console.log(error)
//     }
// }



// // const message = {
// //   data: {
// //     msg: 'msg',
// //     time: '2:45'
// //   },
// //   token: registrationToken
// // };

// // // Send a message to the device corresponding to the provided
// // // registration token.
// // getMessaging().send(message)
// //   .then((response) => {
// //     // Response is a message ID string.
// //     console.log('Successfully sent message:', response);
// //   })
// //   .catch((error) => {
// //     console.log('Error sending message:', error);
// //   });