// Firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const firebaseService = {
    sendMessage: (messageText) => {
        const message = {
            text: messageText,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            user: {
                name: "Your User Name" // You can replace this with the actual user's name
            }
        };

        return db.collection('messages').add(message)
            .catch(error => {
                console.error('Error sending message:', error);
            });
    },

    getMessages: (callback) => {
        return db.collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        const newMessage = { id: change.doc.id, ...change.doc.data() };
                        callback(newMessage);
                    }
                });
            });
    },

    unsubscribeMessages: () => {
        // Functionality to unsubscribe from messages
    }
};

export default firebaseService;
