import { Button } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../actions/users";

const Introduction = (): ReactNode => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p>Welcome to edittube</p>
      <Link to="/home">Goto Home</Link>
      <Button variant="contained" onClick={() => getUser()}>
        Get User Without Token
      </Button>
    </div>
  );
};

export default Introduction;
