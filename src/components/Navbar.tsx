import { ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  CssBaseline,
} from "@mui/material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = (): ReactNode => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <section>
      <CssBaseline />
      <AppBar
        sx={{ backgroundColor: "#3F72AF", color: "F9F7F7" }}
        position="static"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <VideoLibraryIcon></VideoLibraryIcon>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Edittube
          </Typography>
          <Stack direction="row" spacing={2}>
            {isAuthenticated ? (
              <Button color="inherit" onClick={() => logout()}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" onClick={() => loginWithRedirect()}>
                Signin/Signup
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </section>
  );
};

export default Navbar;
