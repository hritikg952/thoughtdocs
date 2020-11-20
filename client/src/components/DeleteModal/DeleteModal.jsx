import React from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modalText: {
    color: "black",
    fontSize: "1.2rem",
    fontWeight: "600"
  },
}));

function DeleteModal({ openModal, handleClose, handleDelete }) {
  const classes = useStyles();
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <div>
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className={classes.modalText}
          >
            Sure you want to delete the post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteModal;
