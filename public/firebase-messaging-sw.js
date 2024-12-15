// importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// importScripts(
//   "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
// );

// const firebaseConfig = {
//     apiKey: "AIzaSyCUgAK0CV3h4Bc78MjN32G-4FFSh0-gplA",
//     authDomain: "chatapp-b0b76.firebaseapp.com",
//     projectId: "chatapp-b0b76",
//     storageBucket: "chatapp-b0b76.firebasestorage.app",
//     messagingSenderId: "159305042262",
//     appId: "1:159305042262:web:34f9058e379d69f1496ef7"
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
    
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });