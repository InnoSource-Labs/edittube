import { ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  Stack,
  Button,
  CssBaseline,
  Avatar,
} from "@mui/material";
import { useUserAuthContext } from "../providers/UserAuthProvider";
import { Link } from "react-router-dom";
import LogoSvg from "../svg/LogoSvg";

const Navbar = (): ReactNode => {
  const { login, logout, isAuthenticated, user } = useUserAuthContext();

  return (
    <section className="mb-4 sticky top-0 z-50 ">
      <CssBaseline />
      <AppBar sx={{ backgroundColor: "#276678" }} position="static">
        <Toolbar className="flex justify-between items-center">
          <Link to="/home" className="flex items-center">
            <LogoSvg />
          </Link>
          <Stack direction="row" spacing={2}>
            <Avatar alt={user?.name} src={user?.picture} />
            {isAuthenticated ? (
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" onClick={login}>
                Login
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </section>
  );
};

export default Navbar;
