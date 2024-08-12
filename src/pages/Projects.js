import React, { useState, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import { styled, css } from "styled-components";
import Header from "components/headers/light.js";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";
import { fetchPageData, fetchImageURL } from "../firebase/firebase";

const HeadingRow = tw.div`flex`;
const HighlightedText = styled.span`
  color: ${(props) => props.color || "black"};
`;
const Heading = tw(SectionHeading)`text-purple-900 text-xl`;
const Posts = tw.div`mt-6 sm:-mr-8 flex flex-wrap`;
const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const PostContainer = styled.div`
  ${tw`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
  ${(props) =>
    props.featured &&
    css`
      ${tw`w-full!`}
      ${Post} {
        ${tw`sm:flex-row! h-full sm:pr-4`}
      }
      ${Image} {
        ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-2/3 rounded-l-4xl`}
      }
      ${Info} {
        ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 rounded-r-4xl sm:border-t-2 sm:border-l-0`}
      }
      ${Description} {
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
      }
    `}
`;
const Title = tw.div`mt-1 font-black text-2xl text-gray-900 group-hover:text-primary-500 transition duration-300`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
const Image = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;
const RightContainer = styled.div``;
const RightTopDiv = styled.div``;
const RightBottomDiv = styled.div``;
const AcceleratorCard = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-auto md:h-64 items-center w-full bg-cover bg-center rounded-lg flex flex-col md:flex-row justify-between px-5 py-[3rem] md:p-10 gap-5`}
  ${Title} {
    ${tw`text-purple-600 text-4xl`}
  }
  ${Info} {
    ${tw`sm:-mr-4 sm:flex-1 min-w-full rounded-4xl sm:border-t-2 w-3/5 bg-white py-8 border-0 border-t-0`}
  }
  ${RightContainer} {
    ${tw`md:w-2/5 flex flex-col rounded-4xl gap-4`}/* Container for the right side stacked divs */
  }
  ${RightTopDiv}, ${RightBottomDiv} {
    ${tw`md:w-full h-1/2 bg-gray-300 p-4 rounded-4xl bg-white`}/* Right side stacked divs with 50% height each */
  }
  ${RightBottomDiv}, ${RightBottomDiv} {
    ${tw`md:w-full h-1/2 bg-gray-300 p-4 rounded-r-4xl bg-white`}/* Right side stacked divs with 50% height each */
  }
`;

const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Description = tw.div``;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;

// Ensure you define the new styled-components for the RightContainer, RightTopDiv, and RightBottomDiv

export default ({ headingText = "Accelerator Portfolio" }) => {
  const [projectsData, setProjectsData] = useState([]);
  const [visible, setVisible] = useState(7);
  const onLoadMoreClick = () => {
    setVisible((v) => v + 6);
  };
  useEffect(() => {
    const getData = async () => {
      const data = await fetchPageData("projects");
      const projects = [data.info_block, ...data.projects];
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
          <Posts>
            {projectsData.slice(0, 1).map((post, index) => (
              <AcceleratorCard
                // style={{ height: "20%" }}
                imageSrc={post.imageSrc}>
                <Info>
                  <Title>{post.title}</Title>
                  {post.featured && post.description && (
                    <Description>{post.description}</Description>
                  )}
                  {post.technologies &&
                    post.technologies.map((t, techIndex) => (
                      <div key={techIndex}>{t}</div>
                    ))}
                </Info>
                <RightContainer>
                  <RightTopDiv>
                    {" "}
                    <p>
                      Join a community of{" "}
                      <HighlightedText color="purple">
                        innovative creators.
                      </HighlightedText>
                    </p>
                  </RightTopDiv>
                  <RightBottomDiv>content</RightBottomDiv>
                </RightContainer>
              </AcceleratorCard>
            ))}
          </Posts>
          <br />
          <Posts>
            {projectsData.slice(0, visible).map((post, index) => (
              <PostContainer key={index} featured={post.featured}>
                <a href={post.repoLink}>
                  <Post className="group" as="a" href={post.url}>
                    <Image imageSrc={post.imageSrc} />
                    <Info>
                      <Category>{post.category}</Category>
                      <CreationDate>{post.date}</CreationDate>
                      <Title>{post.title}</Title>
                      {post.featured && post.description && (
                        <Description>{post.description}</Description>
                      )}
                      {post.technologies &&
                        post.technologies.map((t, techIndex) => (
                          <div key={techIndex}>{t}</div>
                        ))}
                    </Info>
                  </Post>
                </a>
              </PostContainer>
            ))}
          </Posts>
          {/* {visible < posts.length && (
            <ButtonContainer>
              <LoadMoreButton onClick={onLoadMoreClick}>
                Load More
              </LoadMoreButton>
            </ButtonContainer>
          )} */}
        </ContentWithPaddingXl>
      </Container>
    </AnimationRevealPage>
  );
};
