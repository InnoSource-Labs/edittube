import { ReactNode } from "react";
import { Link } from "react-router-dom";

const Home = (): ReactNode => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p>Welcome to home page.</p>
      <Link to="/">Goto Root</Link>
    </div>
  );
};

export default Home;
