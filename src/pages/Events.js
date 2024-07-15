import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import ThreeColWithSideImage from "components/features/ThreeColWithSideImage";

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <ThreeColWithSideImage />
    </AnimationRevealPage>
  );
};
