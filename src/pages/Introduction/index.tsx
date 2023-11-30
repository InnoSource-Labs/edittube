import { ReactNode } from "react";
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

const Introduction = (): ReactNode => {
  return (
    <div className="flex flex-col lg:flex-row justify-between max-w-7xl mx-auto gap-5 p-5">
      <HeroLeft />
      <HeroRight />
    </div>
  );
};

export default Introduction;
