import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAcNIuAkD4U5dJqovFxjIfsF0tN1TSoqjQ",
  authDomain: "ndshop-ffb89.firebaseapp.com",
  projectId: "ndshop-ffb89",
  storageBucket: "ndshop-ffb89.appspot.com",
  messagingSenderId: "829878662857",
  appId: "1:829878662857:web:ef807c4563fb763badff18",
  measurementId: "G-5GYQ79CD7N"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export default app