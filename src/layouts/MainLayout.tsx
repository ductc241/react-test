import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { PATH_SIGNIN } from "../routes/routes.path";
import useAuth from "../hooks/useAuth";

const MainLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSignout = () => {
    localStorage.removeItem("token");
    navigate(PATH_SIGNIN);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component='nav'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            DASHBOARD
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {isAuthenticated ? (
              <Button sx={{ color: "#fff" }} onClick={handleSignout}>
                Logout
              </Button>
            ) : (
              <Button
                sx={{ color: "#fff" }}
                onClick={() => navigate(PATH_SIGNIN)}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='main' sx={{ py: 10, width: "100%" }}>
        <Container>
          <Outlet />
          <Toaster />
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
