import { ReactNode } from "react";
import Navbar from "../components/Navbar";

const Home = (): ReactNode => {
  return (
    <div>
      <Navbar />
      Welcome to home page.
    </div>
  );
};

export default Home;
