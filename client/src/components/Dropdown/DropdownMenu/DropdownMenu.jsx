import React from "react";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  ddContainer: {
    // margin:"0",
    position: "absolute",
    top: "68px",
    right:0,
    width: "300px",
    padding: "0.5rem",
    overflow: "hidden",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    zIndex: 1,
    borderRadius: "4px",
    border: "4px solid #000",
    textAlign:"left"
  },
}));

function DropdownMenu({ children }) {
  const classes = useStyles();
  return <div className={classes.ddContainer}>{children}</div>;
}

export default DropdownMenu;
