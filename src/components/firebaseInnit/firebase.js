// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, writeBatch, doc, setDoc, deleteDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjxT1pC7Y-CRceqpJmxPuVo55GVD45_j4",
    authDomain: "learning-enghebrew-app.firebaseapp.com",
    projectId: "learning-enghebrew-app",
    storageBucket: "learning-enghebrew-app.appspot.com",
    messagingSenderId: "131006409955",
    appId: "1:131006409955:web:bc03c28acda59266f129d6"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const firestore = getFirestore();
const wordsCollection = collection(firestore, "words");
export const addWords = async (words, topic) => {
    const batch = writeBatch(firestore);

    words.forEach((word) => {
        const wordsRef = doc(firestore, "words", "byTopic", topic, word.english);
        batch.set(wordsRef, word);
    })
    await batch.commit();
}
export const setWordInFirebase = async (word, topic) => {
    await setDoc(doc(firestore, "words", topic, word.author, word.english), word);
}
export const getWords = async (topic, uid) => {
    const words = await getDocs(collection(firestore, "words", "byTopic", topic));
    const userWords = uid != null ? await getDocs(collection(firestore, "words", topic, uid)) : null;
    return (userWords?.docs || []).concat(words.docs).map((word) => word.data())

}
export const deleteWordInFirebase = async (word, topic) => {
    await deleteDoc(doc(firestore, "words", topic, word.author, word.english), word);
}