import React, { useState, useEffect, useRef } from "react";
import { Redirect, Link } from "react-router-dom";

import { isAutheticated, signout } from "../../auth/helper/index";
import {
  MenuList,
  MenuItem,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    width: "40px",
    height: "40px",
    border: "none",
    borderRadius: "100%",
    backgroundColor: "rgb(102, 51, 255)",
    outline: "none",
  },
  paperContainer: {
    padding: theme.spacing(1),
  },
}));

function PopUpMenu() {
  const classes = useStyles();
  const [authDetails, setAuthDetails] = useState(null);
  useEffect(() => {
    if (isAutheticated()) {
      setAuthDetails(isAutheticated());
    }
  }, []);

  //! menu logic
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  //! menu logic ends

  //! logout logic
  const [didRedirect, setDidRedirect] = useState(false);
  const logout = () => {
    signout().then((data) => {
      setDidRedirect(true);
      //   setOpen(false);
      window.location.reload(false);
    });
  };

  if (didRedirect) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <button
          className={classes.menuButton}
          ref={anchorRef}
          onClick={handleToggle}
        >
          <img src="./../../assets/images/icons8-user-64.png" />
        </button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper className={classes.paperContainer}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    {authDetails !== null && (
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to={{
                          pathname: `/user/${authDetails.user.name}${authDetails.user.lastname}`,
                          state: { userId: authDetails.user._id },
                        }}
                      >
                        {`${authDetails.user.name} ${authDetails.user.lastname}`}
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={logout} style={{ color: "tomato" }}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

export default PopUpMenu;
