import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { ReactComponent as PersonIcon } from "../../../assets/svg icons/man.svg";

const useStyles = makeStyles((theme) => ({
  ddButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    border: "none",
    borderRadius: "100%",
    outline: "none",
    backgroundColor: "rgb(102, 51, 255)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      width: "40px",
      height: "40px",
    },
  },
  buttonImg: {
    borderRadius: "100%",
    width: "40px",
    height: "40px",
    objectFit:"cover"
  },
}));

function DropdownButton({ imgSrc, children }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <div className={classes.ddButton}>
      <button className={classes.icon} onClick={() => setOpen(!open)}>
        {imgSrc !== null ? (
          <img src={imgSrc} className={classes.buttonImg} />
        ) : (
          <PersonIcon />
        )}
      </button>
      {open && children}
    </div>
  );
}

export default DropdownButton;
