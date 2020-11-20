import React, { useState, useEffect } from "react";
import { createComment } from "../../helpers/index";
import { isAutheticated } from "../../auth/helper/index";
import { getCommentByPost } from "../../helpers/index";

import Comment from "./comment/Comment";

import {
  Paper,
  makeStyles,
  Typography,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  commentContainer: {
    padding: theme.spacing(3),
  },
}));

const Comments = ({ postId }) => {
  const classes = useStyles();

  const [text, setText] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (isAutheticated()) {
      setUserDetails(isAutheticated());
    }

    getCommentByPost(postId).then((data) => {
      data.data.map((d) => setComments((prevVal) => [...prevVal, d]));
    });
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment(postId, userDetails.user._id, {
      text,
      commentType: "Parent",
    }).then((data) => {
      window.location.reload(false);
    });
  };

  return (
    <Paper elivation={3} className={classes.commentContainer}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Typography variant="h4">Discussion</Typography>
        </Grid>
        <Grid item sm={12}>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            rowsMax={Infinity}
            fullWidth
            placeholder="Add to the Discussion"
            variant="outlined"
            value={text}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid container item lg={12} justify="flex-end">
          <Button
            variant="outlined"
            color="primary"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
        </Grid>
        <Grid container item sm={12}>
          {comments.map((comment, index) => {
            return (
              <Grid key={index} item sm={12}>
                <Comment data={comment} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Comments;

// const nestedComments = (comment.children || []).map((comment) => {
//   return <Comments key={comment.id} comment={comment} type="child" />;
// });

// return (
//   <div style={{ marginLeft: "25px", marginTop: "10px" }}>
//     <div>{comment.text}</div>
//     {nestedComments}
//   </div>
// );
