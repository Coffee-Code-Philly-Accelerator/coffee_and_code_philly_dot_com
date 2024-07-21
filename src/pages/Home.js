import React, { useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Hero from "components/hero/FullWidthWithImage";
import ThreeColWithSideImage from "components/features/ThreeColWithSideImage";
import { fetchPageData, fetchImageURL } from "../firebase/firebase";

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
            <span tw="text-primary-500">{homeData["heading2"]}</span>
          </>
        }
        description={homeData.description}
        primaryActionUrl="/joinUs"
        primaryActionText="Join Us"
        secondaryActionUrl="/projects"
        secondaryActionText="Projects"
      />
      <ThreeColWithSideImage />
    </AnimationRevealPage>
  );
};

export default Home;
