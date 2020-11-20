import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  ddContainer: {
    position: "absolute",
    top: "68px",
    width: "300px",
    transform: "translateX(-45%)",
    padding: "1rem",
    overflow: "hidden",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    zIndex: 1,
    borderRadius: "10px"
    
  },
}));

function DropdownMenu({ children }) {
  const classes = useStyles();
  return <div className={classes.ddContainer}>{children}</div>;
}

export default DropdownMenu;
