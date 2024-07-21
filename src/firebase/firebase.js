import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, getDoc, doc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const fetchPageData = async (pageName) => {
  try {
    const docRef = doc(db, "pages", pageName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return {};
    }
  } catch (error) {
    console.error("Error fetching document data: ", error);
    return {};
  }
};

const fetchImageURL = async (imagePath) => {
  try {
    const imageRef = ref(storage, imagePath);
    console.log(imageRef);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error getting image URL:", error);
  }
};

const fetchCollectionData = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = {};
    querySnapshot.forEach((doc) => {
      data[doc.id] = doc.data();
    });
    return data;
  } catch (error) {
    console.error("Error fetching collection data: ", error);
    return {};
  }
};

export { storage, fetchPageData, fetchImageURL };
