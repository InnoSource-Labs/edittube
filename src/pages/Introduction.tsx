import { ReactNode } from "react";
import IntroHero from "./intro/hero/IntroHero";
// import { Link } from "react-router-dom";

const Introduction = (): ReactNode => {
  return (
    // <div className="flex flex-col justify-center items-center">
    //   {/* <p>Welcome to edittube</p>
    //   <Link to="/home">Goto Home</Link> */}

    // </div>
    <div className="flex flex-col h-screen  md:flex-row justify-between max-w-7xl mx-auto">
      <IntroHero />
    </div>
  );
};

export default Introduction;
