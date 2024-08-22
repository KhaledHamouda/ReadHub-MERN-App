import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import ClassIcon from "@mui/icons-material/Class";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import { changeMood, setloginState, setOpenSearchDialog, setUserData } from "../../Redux/DataSlice";
import { scroller } from "react-scroll";
import { useNavigate } from "react-router";
import SearchIcon from '@mui/icons-material/Search';
import { SearchDialog } from "../../assets/SearchDialog";

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.mode === 'light'
    // ? "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)"
    // ? "rgb(152, 171, 238)"
    // ?"rgb(204, 224, 172)"
    ?"rgb(78, 49, 170)"
    : "linear-gradient(45deg, #333 30%, #555 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  // padding: "0 30px",
  alignItems: "center",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const Navbar: React.FC = () => {
  const { loginState } = useSelector((state: any) => state.DataReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pages = ["Home", "Books", "Categories", "Authors"];
  console.log(`loginstate: ${loginState}`)
  const settings = loginState ? ["Profile", "Dashboard", "Logout"] : ["Login", "Admin"];

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { mode } = useSelector((state: any) => state.DataReducer);
  const theme = useTheme();
  const drawerWidth = 240;

  const [open, setOpen] = useState(false);

  const handleDrawerClose = (page: string) => {
    setOpen(false);
    if (page !== "") scrollToSection(page);
  };

  const handleDrawerNavigate = (page: string) => {
    setAnchorElUser(null);
    setOpen(false);
    if (page.toLowerCase() === 'login') {
      navigate('/login');
    } else if (page === 'profile') {
      console.log("profiler")
      navigate(`/${page}/${sessionStorage.getItem("id")}`);
    } else if (page === 'Logout') {
      dispatch(setloginState(false))
      sessionStorage.clear();
      dispatch(setUserData({}));
      sessionStorage.removeItem("img");
      sessionStorage.removeItem("id");
      navigate("/");
      scrollToSection("Home");
    } else {
      navigate(`/${page.toLowerCase()}`);
    }
  };

  const { openSearchDialog } = useSelector((state: any) => state.DataReducer);

  const scrollToSection = (page: string) => {
    // if (document.location.href !== "http://localhost:3100/") {
    //   navigate("/");
    // }
    page = page === "Home" ? "topPage" : page;
    scroller.scrollTo(page, {
      duration: 500,
      delay: 0,
      offset: -70,
      smooth: "easeInOutQuart",
    });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Typography variant="h5">ReadsHub</Typography>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Books
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleDrawerClose(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="small"
              color="inherit"
              aria-label="Dark Mood"
              onClick={() => dispatch(changeMood(mode))}
            >
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Box>

          <IconButton
            size="small"
            sx={{ marginRight: "10px", marginLeft: "7px" }}
            color="inherit"
            aria-label="Search"
            onClick={() => dispatch(setOpenSearchDialog(true))}
          >
            <SearchIcon />
          </IconButton>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src={sessionStorage.getItem("img") || ""} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleDrawerNavigate(setting)}>
                  <Typography style={{ color: theme.palette.mode === "light" ? "black" : "white" }} textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={() => handleDrawerClose("")}>
              {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {pages.map((page, index) => (
              <ListItem button key={page} onClick={() => handleDrawerClose(page)}>
                <ListItemIcon>
                  {index === 0 ? <HomeIcon /> : null}
                  {index === 1 ? <MenuBookIcon /> : null}
                  {index === 2 ? <ClassIcon /> : null}
                </ListItemIcon>
                <ListItemText primary={page} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button onClick={() => handleDrawerNavigate("Login")}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button onClick={() => handleDrawerNavigate("Logout")}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
      </Container>

      {openSearchDialog && <SearchDialog />}
    </StyledAppBar>
  );
};

export default Navbar;
