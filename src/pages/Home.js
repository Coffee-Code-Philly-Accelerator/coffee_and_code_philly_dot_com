import AnimationRevealPage from "helpers/AnimationRevealPage";
import Hero from "components/hero/FullWidthWithImage";
import ThreeColWithSideImage from "components/features/ThreeColWithSideImage";

const Home = () => {
  return (
    <AnimationRevealPage>
      <Hero />
      <ThreeColWithSideImage />
    </AnimationRevealPage>
  );
};

export default Home;
