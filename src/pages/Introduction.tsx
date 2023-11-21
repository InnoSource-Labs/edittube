import { ReactNode } from "react";
import { Link } from "react-router-dom";

const Introduction = (): ReactNode => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p>Welcome to edittube</p>
      <Link to="/home">Goto Home</Link>
    </div>
  );
};

export default Introduction;
