import React, { useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Hero from "components/hero/FullWidthWithImage";
import ThreeColSimple from "components/features/ThreeColSimple.js";
import { fetchPageData, fetchImageURL } from "../firebase/firebase";

import SupportIconImage from "images/support-icon.svg";
import BoltImageIcon from "images/fast-icon.svg";
import ArrowsIconImage from "images/reliable-icon.svg";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";

const Home = () => {
  const [homeData, sethomeData] = useState({});

  const icons = {
    SupportIconImage,
    BoltImageIcon,
    ArrowsIconImage,
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchPageData("home");
      console.log(data);
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
        primaryActionUrl={homeData.primaryActionUrl}
        primaryActionText={homeData.primaryActionText}
        secondaryActionUrl={homeData.secondaryActionUrl}
        secondaryActionText={homeData.secondaryActionText}
      />
      <ThreeColSimple
        cards={
          homeData.pillars &&
          homeData.pillars.map((pillar) => {
            return {
              imageSrc: icons[pillar.icon],
              title: pillar.title,
              description: pillar.description,
              url: pillar.url,
            };
          })
        }
        linkText="Learn More"
        heading=""
        subheading=""
        description=""
        imageContainerCss={null}
        imageCss={null}
      />
    </AnimationRevealPage>
  );
};

export default Home;
