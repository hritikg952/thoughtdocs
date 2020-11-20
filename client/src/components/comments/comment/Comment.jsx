import React, { useState, useEffect } from "react";
import moment from "moment";
import { getLoggedInUserId } from "../../../auth/helper/index";

import {
  Grid,
  makeStyles,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";

import { createChildComment } from "../../../helpers/index";
const useStyles = makeStyles((theme) => ({
  commentContainer: {
    padding: theme.spacing(3),
    borderLeft: "3px solid #DBDBDB",
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    width: "100%",
  },
  rowContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  toggleReplyContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
}));

function Comment({ data }) {
  const classes = useStyles();
  const loggedInUserId = getLoggedInUserId();
  const [toggleShow, setToggleShow] = useState(false);
  const [childReply, setChildReply] = useState("");
  const nestedComment = (data.children || []).map((comment,index) => {
    return <Comment key={index} data={comment} type="child" />;
  });

  const handleRepyClick = (e) => {
    e.preventDefault();
    setToggleShow(!toggleShow);
  };

  const handleChildReplyChange = (e) => {
    e.preventDefault();
    setChildReply(e.target.value);
  };

  const handleChildReplySubmitClick = (e) => {
    e.preventDefault();
    console.log(data);
    createChildComment(data._id, data.post, loggedInUserId, {
      text: childReply,
      commentType: "Child",
    }).then((data) => {
      if (data.status === 200) {
        window.location.reload(false);
      }
    });
  };

  return (
    <Grid container sm={12} className={classes.commentContainer}>
      <Grid item  className={classes.rowContainer}>
        <Typography
          variant="h6"
          style={{ fontWeight: "600" }}
        >{`${data.author.name} ${data.author.lastname}`}</Typography>
        <Typography variant="caption">
          {moment(data.created_at).format("MMM Do YY")}
        </Typography>
      </Grid>
      <Typography variant="subtitle1">{data.text}</Typography>
      <Button color="primary" onClick={(e) => handleRepyClick(e)}>
        Reply
      </Button>
      {nestedComment}
      {toggleShow && (
        <Grid item className={classes.toggleReplyContainer}>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            rowsMax={Infinity}
            fullWidth
            placeholder="Add to the Discussion"
            variant="outlined"
            value={childReply}
            onChange={(e) => handleChildReplyChange(e)}
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handleChildReplySubmitClick(e)}
            >
              Submit
            </Button>
            <Button color="secondary">Dismiss</Button>
          </div>
        </Grid>
      )}
    </Grid>
  );
}

export default Comment;
