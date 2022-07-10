// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnlE5-6OOoGGVAuSIaTYw1kMabkaa-vec",
  authDomain: "sideflix-acf35.firebaseapp.com",
  projectId: "sideflix-acf35",
  storageBucket: "sideflix-acf35.appspot.com",
  messagingSenderId: "785339152300",
  appId: "1:785339152300:web:da3b9e5c0c108188452c09"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }