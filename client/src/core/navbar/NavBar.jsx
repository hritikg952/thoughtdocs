import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import "./navbar.css";
import { isAutheticated, signout } from "../../auth/helper/index";
// import PopUpMenu from "../../components/NavBarPopupMenu/PopUpMenu";
import DropdownButton from "../../components/Dropdown/DropdownButton/DropdownButton";
import DropdownMenu from "../../components/Dropdown/DropdownMenu/DropdownMenu";
// import DropdownItem from "../../components/Dropdown/DropdownItem/DropdownItem";


const NavBar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [authDetails, setAuthDetails] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [didRedirect, setDidRedirect] = useState(false);

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

  const navbar = () => {
    if (didRedirect) {
      return <Redirect to="/" />;
    } else
      return (
        <header className="header">
          <h1 className="logo">Doc. Thoughts</h1>
          {(!isSmallScreen || isNavVisible) && (
            <nav className="nav">
              <Link to="/writeapost" className="post-btn">
                Write a post
              </Link>
              <Link to="/">Home</Link>
              <Link to="/toparticles">Top Articles</Link>
              <Link to="aboutus">About Us</Link>
              {isAuth ? (
                <DropdownButton imgSrc={authDetails.user.profileImage}>
                  <DropdownMenu meta={authDetails}>
                    <Link
                      to={{
                        pathname: `/user/${authDetails.user.name}${authDetails.user.lastname}`,
                        state: { userId: authDetails.user._id },
                      }}
                      className="ddItem"
                    >
                      {`${authDetails.user.name} ${authDetails.user.lastname}`}
                    </Link>
                    <button className="ddItem-button" onClick={logout}>
                      Log Out
                    </button>
                  </DropdownMenu>
                </DropdownButton> //profile class from postcard component
              ) : (
                <Link to="/signin" className="login-btn">
                  Log In
                </Link>
              )}
            </nav>
          )}

          <button onClick={toggleNav} className="burger">
            X
          </button>
        </header>
      );
  };

  return <React.Fragment>{navbar()}</React.Fragment>;
};

export default NavBar;
