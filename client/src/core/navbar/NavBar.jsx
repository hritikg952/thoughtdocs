import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import "./navbar.css";
import { isAutheticated, signout } from "../../auth/helper/index";
// import PopUpMenu from "../../components/NavBarPopupMenu/PopUpMenu";
import DropdownButton from "../../components/Dropdown/DropdownButton/DropdownButton";
import DropdownMenu from "../../components/Dropdown/DropdownMenu/DropdownMenu";
// import DropdownItem from "../../components/Dropdown/DropdownItem/DropdownItem";

import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  makeStyles,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CreateIcon from "@material-ui/icons/Create";
import StarsIcon from "@material-ui/icons/Stars";
import ListIcon from "@material-ui/icons/List";
import DashboardIcon from "@material-ui/icons/Dashboard";
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: "2rem",
    backgroundColor: "#000",
    padding: "0.4rem 0.8rem",
    borderRadius: "10px",
    cursor: "pointer",
    "& a": {
      textDecoration: "none",
      fontWeight: "900",
      color: "#ffffff",
    },
    "&:hover": {
      backgroundColor: "rgb(27, 27, 27)",
    },
  },
  navButton: {
    padding: "0.5rem 1rem",
    fontSize: "1.2rem",
    borderRadius: "10px",
    fontWeight: "500",
    color: "#323ebe",
    marginLeft: "5px",
    "& a": {
      textDecoration: "none",
    },
    "&:hover": {
      backgroundColor: "#F6F6F6",
      transition: "all 0.3s ease-out",
      cursor: "pointer",
    },
  },
  postButton: {
    padding: "0.5rem 1rem",
    fontSize: "1.2rem",
    backgroundColor: "#323ebe",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    fontWeight: "600",
    transformStyle: "flat",
    "&:hover": {
      backgroundColor: "#1f299b",
    },
  },
  navContainer: {
    display: "flex",
    alignItems: "center",
  },
  ddItem: {
    textDecoration: "none",
    padding: "0.5rem",
    fontSize: "1.2rem",
    fontWeight: "300",
    color: "rgb(54, 54, 54)",
    fontWeight: "600",
    borderRadius: "10px",
    "& hover": {
      backgroundColor: "#F6F6F6",
      color: "#323ebe",
    },
  },
  logoutBtn: {
    backgroundColor: "#ff6347",
    border: "none",
    borderRadius: "5px",
    color: "black",
    fontWeight: "bold",
    fontSize: "1.2rem",
    transformStyle: "flat",
    transition: "all 250ms ease-out",
    marginTop: "5px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "#e84f36",
    },
  },
  loginBtn: {
    padding: "0.5rem 1rem",
    fontSize: "1.2rem",
    backgroundColor: "#323ebe",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    fontWeight: "600",
    transformStyle: "flat",
    "&:hover": {
      backgroundColor: "#1f299b",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  listContainer: {
    width: "300px",
    padding: "1.2rem",
  },
  listItemButtonText: {
    fontSize: "1.2rem",
    fontWeight: "600",
  },
  buttonImg: {
    borderRadius: "100%",
    width: "40px",
    height: "40px",
    objectFit: "cover",
  },
}));
const NavBar = () => {
  const classes = useStyles();
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [authDetails, setAuthDetails] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [didRedirect, setDidRedirect] = useState(false);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setIsMobileView(true)
        : setIsMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
    return function cleanup() {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    //if user is not signed in then navbar will only show signin button
    if (isAutheticated()) {
      setIsAuth(true);
      setAuthDetails(isAutheticated());
    } else {
      setIsAuth(false);
    }
    console.log("rendered");
  }, []);

  useEffect(() => {
    //checking screensize for nav
    const mediaquery = window.matchMedia("(max-width: 700px)");
    mediaquery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaquery);

    return () => {
      mediaquery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaquery) => {
    if (mediaquery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const logout = () => {
    signout().then((data) => {
      setDidRedirect(true);
      //   setOpen(false);
      window.location.reload(false);
    });
  };

  const mobileView = () => {
    return (
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h1" className={classes.logo}>
              <Link to="/">Doc. Thoughts</Link>
            </Typography>
          </Grid>
          <Grid item>
            {isAuth ? (
              <>
                <IconButton onClick={() => toggleMenu()}>
                  <MenuIcon fontSize="large" />
                </IconButton>
                <SwipeableDrawer
                  anchor="right"
                  open={isMenuOpen}
                  onClose={() => toggleMenu()}
                  onOpen={() => toggleMenu()}
                >
                  <List className={classes.listContainer}>
                    <ListItem
                      button
                      component={Link}
                      to={{
                        pathname: `/user/${authDetails.user.name}${authDetails.user.lastname}`,
                        state: { userId: authDetails.user._id },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={authDetails.user.profileImage} />
                      </ListItemAvatar>
                      <ListItemText
                        classes={{ primary: classes.listItemButtonText }}
                      >{`${authDetails.user.name} ${authDetails.user.lastname}`}</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem button component={Link} to="/writeapost">
                      <ListItemIcon>
                        <CreateIcon />
                      </ListItemIcon>
                      <ListItemText>Write A Post</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/">
                      <ListItemIcon>
                        <StarsIcon />
                      </ListItemIcon>
                      <ListItemText>Top Articles</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/writeapost">
                      <ListItemIcon>
                        <ListIcon />
                      </ListItemIcon>
                      <ListItemText>Reading List</ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/writeapost">
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText>Dashboard</ListItemText>
                    </ListItem>
                    <ListItem
                      button
                      onClick={logout}
                      className={classes.logoutBtn}
                    >
                      <ListItemText>Log out</ListItemText>
                    </ListItem>
                  </List>
                </SwipeableDrawer>
              </>
            ) : (
              <Button
                component={Link}
                to="/signin"
                className={classes.loginBtn}
              >
                Log In
              </Button>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    );
  };
  const desktopView = () => {
    return (
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h1" className={classes.logo}>
              <Link to="/">Doc. Thoughts</Link>
            </Typography>
          </Grid>
          {isAuth ? (
            <Grid item className={classes.navContainer}>
              <Button
                {...{
                  color: "inherit",
                  to: "/writeapost",
                  component: Link,
                  className: classes.postButton,
                }}
              >
                Write a post
              </Button>
              <Button
                {...{
                  color: "inherit",
                  to: "/toparticles",
                  component: Link,
                  className: classes.navButton,
                }}
              >
                Top Articles
              </Button>
              <Button
                {...{
                  color: "inherit",
                  to: "/aboutus",
                  component: Link,
                  className: classes.navButton,
                }}
              >
                About Us
              </Button>
              <DropdownButton imgSrc={authDetails.user.profileImage}>
                <DropdownMenu meta={authDetails}>
                  <Button
                    component={Link}
                    to={{
                      pathname: `/user/${authDetails.user.name}${authDetails.user.lastname}`,
                      state: { userId: authDetails.user._id },
                    }}
                    className={classes.ddItem}
                  >
                    {`${authDetails.user.name} ${authDetails.user.lastname}`}
                  </Button>

                  <Button component={Link} to="/" className={classes.ddItem}>
                    Dashboard
                  </Button>

                  <Button
                    component={Link}
                    to="/writeapost"
                    className={classes.ddItem}
                  >
                    Write a post
                  </Button>

                  <Button component={Link} to="/" className={classes.ddItem}>
                    Reading List
                  </Button>

                  <Button className={classes.logoutBtn} onClick={logout}>
                    Log Out
                  </Button>
                </DropdownMenu>
              </DropdownButton>{" "}
            </Grid>
          ) : (
            <Button component={Link} to="/signin" className={classes.loginBtn}>
              Log In
            </Button>
          )}
        </Grid>
      </Toolbar>
    );
  };

  const navbar = () => {
    if (didRedirect) {
      return <Redirect to="/" />;
    } else {
      return (
        <header>
          <AppBar className={classes.appBar}>
            {isMobileView ? mobileView() : desktopView()}
          </AppBar>
        </header>
      );
    }
  };
  return <React.Fragment>{navbar()}</React.Fragment>;
};

export default NavBar;
