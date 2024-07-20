import React, { useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Hero from "components/hero/FullWidthWithImage";
import ThreeColWithSideImage from "components/features/ThreeColWithSideImage";
import db from "../firebase/firebase";
import { collection, getDoc, doc, getDocs } from "firebase/firestore";

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

const Home = () => {
  const [homeData, sethomeData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const data = await fetchPageData("home");
      sethomeData(data);
    };

    getData();
  }, []);

  return (
    <AnimationRevealPage>
      <Hero
        heading={
          <>
            {homeData["heading1"]}
            <wbr />
            <br />
            <span tw="text-primary-500">{homeData["heading2"]}.</span>
          </>
        }
        description={homeData.description}
      />
      <ThreeColWithSideImage />
    </AnimationRevealPage>
  );
};

export default Home;
