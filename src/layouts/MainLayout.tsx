import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UserList from "../modules/Users";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component='nav'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            // onClick={handleDrawerToggle}
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
            <Button sx={{ color: "#fff" }}>Login</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='main' sx={{ py: 10, width: "100%" }}>
        <Outlet />
        <Toaster />
      </Box>
    </Box>
  );
};

export default MainLayout;
