import React, { useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Hero from "components/hero/FullWidthWithImage";
import ThreeColSimple from "components/features/ThreeColSimple.js";
import { fetchPageData, fetchImageURL } from "../firebase/firebase";

import SupportIconImage from "images/support-icon.svg";
import BoltImageIcon from "images/fast-icon.svg";
import ArrowsIconImage from "images/reliable-icon.svg";
import { Container, ContentWithPaddingLg } from "components/misc/Layouts.js";
import Calendar from "react-lightweight-calendar";
import { SectionHeading } from "components/misc/Headings.js";
import tw from "twin.macro";
import getFormattedDate from "utils/dates";

const Heading = tw(SectionHeading)`w-full`;

const Home = () => {
  const [homeData, sethomeData] = useState({});
  const [currentDate, setCurrentDate] = useState(getFormattedDate(new Date()));

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
            <span className="text-primary-500">{homeData["heading2"]}</span>
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
      <Container>
        <ContentWithPaddingLg>
          <Heading>Check out one of our events</Heading>
          <br />
          <Calendar
            data={homeData.calendar}
            currentView="MONTH"
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            activeTimeDateField="startTime" // Or just startTime or just endTime
            weekStartsOn={1} // Monday
          />
        </ContentWithPaddingLg>
      </Container>
    </AnimationRevealPage>
  );
};

export default Home;
