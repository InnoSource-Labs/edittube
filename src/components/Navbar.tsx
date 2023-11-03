import { ReactNode } from "react";
import { Link } from "react-router-dom";
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

const Navbar = (): ReactNode => {
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
            <Button color="inherit">
              <Link
                to="/signin"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Signin
              </Link>{" "}
            </Button>
            <Button color="inherit">
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Signup
              </Link>{" "}
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </section>
  );
};

export default Navbar;
