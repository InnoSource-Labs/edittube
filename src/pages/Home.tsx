import { Button } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../actions/users";
import { useAuth0 } from "@auth0/auth0-react";

const Home = (): ReactNode => {
  const { getAccessTokenSilently } = useAuth0();

  return (
    <div className="flex flex-col justify-center items-center">
      <p>Welcome to home page.</p>
      <Link to="/">Goto Root</Link>
      <Button
        variant="contained"
        onClick={async () => getUser(await getAccessTokenSilently())}
      >
        Get User With Token
      </Button>
    </div>
  );
};

export default Home;
