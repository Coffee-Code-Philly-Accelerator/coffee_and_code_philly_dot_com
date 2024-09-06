import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { fetchImageURL } from "../../firebase/firebase";
import Header, { LogoLink } from "../headers/light.js";

const StyledHeader = styled(Header)`
  ${tw`justify-between`}
  ${LogoLink} {
    ${tw`mr-8 pb-0`}
  }
`;

const Container = tw.div`relative -mx-8 -mt-8`;
const TwoColumn = tw.div`flex flex-col lg:flex-row bg-T3RTIARY-lightest`;
const LeftColumn = tw.div`ml-8 mr-8 xl:pl-10 py-8`;
const RightColumn = styled.div`
  background-image: url(${await fetchImageURL("main.png")});
  ${tw`bg-green-500 bg-cover bg-center xl:ml-24 h-96 lg:h-auto lg:w-1/2 lg:flex-1`}
`;

const Content = tw.div`mt-24 lg:mt-24 lg:mb-24 flex flex-col sm:items-center lg:items-stretch`;
const Heading = tw.h1`text-3xl sm:text-5xl md:text-6xl lg:text-5xl font-black leading-none`;
const Paragraph = tw.p`max-w-md my-8 lg:my-5 lg:my-8 sm:text-lg lg:text-base xl:text-lg leading-loose`;

const Actions = styled.div`
  ${tw`mb-8 lg:mb-0`}
  .action {
    ${tw`text-center inline-block w-full sm:w-48 py-4 font-semibold tracking-wide rounded hocus:outline-none focus:shadow-outline transition duration-300`}
  }
  .primaryAction {
    ${tw`bg-primary-500 text-black hover:bg-primary-700`}
  }
  .secondaryAction {
    ${tw`mt-4 sm:mt-0 sm:ml-4 bg-gray-300 text-black hover:bg-gray-400 hover:text-gray-800`}
  }
`;

export default ({
  navLinks = null,
  heading = (
    <>
      Find Perfect Hotels
      <wbr />
      <br />
      <span tw="text-primary-500">anywhere you go.</span>
    </>
  ),
  description = "We've been in the hotels business across the world for 5 years now. We assure you that you will always enjoy your stay with us.",
  primaryActionUrl = "/join-us",
  primaryActionText = "Join Us",
  secondaryActionUrl = "#",
  secondaryActionText = "",
}) => {
  return (
    <Container>
      <TwoColumn>
        <LeftColumn>
          <StyledHeader links={navLinks} collapseBreakpointClass="sm" />
          <Content>
            <Heading>{heading}</Heading>
            <Paragraph>{description}</Paragraph>
            <Actions>
              <a href={primaryActionUrl} className="action primaryAction">
                {primaryActionText}
              </a>
              <a href={secondaryActionUrl} className="action secondaryAction">
                {secondaryActionText}
              </a>
            </Actions>
          </Content>
        </LeftColumn>
        <RightColumn background-image=""></RightColumn>
      </TwoColumn>
    </Container>
  );
};
