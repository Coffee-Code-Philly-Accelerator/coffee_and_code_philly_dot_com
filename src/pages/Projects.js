/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import {
  Container,
  ContentWithPaddingXl,
  ContentWithPaddingLg,
} from "components/misc/Layouts";
import tw from "twin.macro";
import { styled, css } from "styled-components";
import Header from "components/headers/light.js";
import { SectionHeading } from "components/misc/Headings";
import { fetchPageData, fetchImageURL } from "../firebase/firebase";
import { SiTailwindcss } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { SiFirebase } from "react-icons/si";

const HighlightedText = tw.span`text-primary-600`;
const Heading = tw(SectionHeading)`text-primary-600 text-xl mb-5`;
const Posts = tw.div`flex flex-wrap border-2 rounded-4xl p-10 md:p-12 bg-gray-100`;
const Info = tw.div`px-3 py-2 border-t-2 border-gray-300 rounded-lg rounded-t-none`;
const Description = tw.div`my-2 font-semibold text-gray-600`;
const Title = tw.div`text-2xl text-primary-600 group-hover:text-blue-500 transition duration-300 font-bold`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-4xl shadow-lg w-4/5`;
const SVGContainer = tw.div`flex flex-row gap-3 mb-3 justify-center`;
const RightContainer = styled.div``;
const RightTopDiv = styled.div``;
const RightBottomDiv = styled.div``;
const ProjectGenre = styled.div``;

const Image = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-4xl relative`}
  ${ProjectGenre} {
    ${tw`absolute bottom-[.75rem] right-[.5rem] w-1/4 p-2 bg-black bg-opacity-50 text-white text-sm text-center rounded-xl`}
  }
`;
const ProjectContainer = styled.div`w-full sm:w-1/3 lg:w-1/3 sm:pr-8`;
const AcceleratorCard = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-auto md:h-64 items-center w-full bg-cover bg-center rounded-4xl flex flex-col md:flex-row justify-between px-5 py-[3rem] md:p-8 md:py-0 gap-5 md:gap-10`}
  ${Title} {
    ${tw`text-4xl`}
  }
  ${Info} {
    ${tw`w-3/5 flex-1 min-w-full md:min-w-0 rounded-4xl bg-white py-5 px-10 border-0 text-lg font-semibold`}
  }
  ${RightContainer} {
    ${tw`md:w-2/5 flex flex-col rounded-4xl gap-4`}/* Container for the right side stacked divs */
  }
  ${RightTopDiv}, ${RightBottomDiv} {
    ${tw`h-20 w-full p-4 rounded-4xl bg-white text-center flex justify-center items-center text-lg font-semibold`}/* Right side stacked divs with 50% height each */
  }
  button {
    ${tw`w-full bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300 ml-3`}
  }
`;

export default function Projects({ headingText = "Accelerator Portfolio" }) {
  const [projectsData, setProjectsData] = useState([]);
  const [headerCardData, setheaderCardData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const data = await fetchPageData("projects");

      // Separate info_block from projects
      const infoBlock = data.info_block;
      const projects = data.projects;

      // Fetch image for headerCardData (infoBlock)
      const headerImageUrl = await fetchImageURL(infoBlock.imageSrc);
      const updatedHeaderCardData = { ...infoBlock, imageSrc: headerImageUrl };

      // Update headerCardData state
      setheaderCardData(updatedHeaderCardData);

      // Fetch images for each project and update projectsData
      const updatedProjects = await Promise.all(
        projects.map(async (post) => {
          const imageUrl = await fetchImageURL(post.imageSrc);
          return { ...post, imageSrc: imageUrl };
        })
      );
      setProjectsData(updatedProjects);
    };

    getData();
  }, []);

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <Heading>{headingText}</Heading>
          <AcceleratorCard imageSrc={headerCardData.imageSrc}>
            <Info>
              <Title>{headerCardData.title}</Title>
              {headerCardData.featured && headerCardData.description && (
                <Description>{headerCardData.description}</Description>
              )}
              {headerCardData.technologies &&
                headerCardData.technologies.map((t, techIndex) => (
                  <div key={techIndex}>{t}</div>
                ))}
            </Info>
            <RightContainer>
              <RightTopDiv>
                {" "}
                <p>
                  Join a community of{" "}
                  <HighlightedText>innovative creators.</HighlightedText>
                </p>
              </RightTopDiv>
              <RightBottomDiv>
                <p>The adventure awaits {"->"}</p>
                <button>Sign Up</button>
              </RightBottomDiv>
            </RightContainer>
          </AcceleratorCard>
          <br />
          <Posts>
            {projectsData.map((project, index) => (
              <ProjectContainer key={index} href={project.repoLink}>
                <Post className="group" as="a" href={project.url}>
                  <Image imageSrc={project.imageSrc}>
                    <ProjectGenre>{project.genre}</ProjectGenre>
                  </Image>
                  <Info>
                    <Title>{project.title}</Title>
                    <Description>{project.description}</Description>
                    <br />
                    {/* {project.technologies &&
                        project.technologies.map((t, techIndex) => (
                          <div key={techIndex}>{t}</div>
                        ))} */}
                    <SVGContainer>
                      <FaReact size={28} />
                      <SiTailwindcss size={28} />
                      <SiFirebase size={28} />
                    </SVGContainer>
                  </Info>
                </Post>
              </ProjectContainer>
            ))}
          </Posts>
        </ContentWithPaddingXl>
      </Container>
    </AnimationRevealPage>
  );
}
