import React, { useState, useEffect } from "react";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Grid, makeStyles, Paper, Hidden } from "@material-ui/core";

import NavBar from "../../core/navbar/NavBar";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Comments from "../../components/comments/Comments";
import { getPost, getUser, getCommentByPost } from "../../helpers/index";
import "./ReadPost.css";
import CircularLoader from "../../components/loader/CircularLoader";
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    // justifyContent: "center",
    // width: "100%",
  },
  postContainer: {
    padding: theme.spacing(5),
  },
  heading: {
    fontWeight: "700",
    fontSize: "3rem",
  },
}));

function ReadPost(props) {
  const classes = useStyles();

  const { id, author_id } = props.location.state;
  const [loader, setLoader] = useState(false);
  const [postData, setPostData] = useState({});
  const [authorData, setAuthorData] = useState({});
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    setLoader(true);
    getPost(author_id, id).then((data) => {
      setPostData(data.data);
      setLoader(false);
      const contentState = convertFromRaw(JSON.parse(data.data.content));
      setEditorState(EditorState.createWithContent(contentState));
    });
    getUser(author_id).then((data) => {
      setAuthorData(data.data);
    });
  }, []);

  const readpost = () => {
    return (
      <div style={{ padding: "10px" }}>
        <Grid container className={classes.mainContainer} spacing={1}>
          <Grid container item xs={12} lg={8} spacing={1}>
            <Grid item lg={12}>
              <Paper elivation={3} className={classes.postContainer}>
                <div className={classes.titleHeader}>
                  <h1 className={classes.heading}>{postData.title}</h1>
                </div>
                <div className="editorStyling">
                  {loader ? (
                    <CircularLoader />
                  ) : (
                    <Editor editorState={editorState} readOnly toolbarHidden />
                  )}
                </div>
              </Paper>
            </Grid>
            <Grid item lg={12}>
              <div>
                {/* {commentData.comments.map((comment) => {
                return <Comments key={comment.id} comment={comment} />;
              })} */}
                <Comments postId={id} />
              </div>
            </Grid>
          </Grid>
          <Hidden mdDown>
            <Grid item lg={4} className={classes.authorContainer}>
              <ProfileCard authorId={author_id} />
            </Grid>
          </Hidden>
        </Grid>
      </div>
    );
  };

  return (
    <>
      <NavBar />
      {readpost()}
    </>
  );
}

export default ReadPost;

// const commentData = {
//   title: "Fake article title.",
//   author: "grzm",
//   comments: [
//     {
//       id: 1,
//       text: "Example comment here.",
//       author: "user2",
//       children: [
//         {
//           id: 2,
//           text: "Another example comment text.",
//           author: "user3",
//           children: [
//             {
//               id: 3,
//               text: "Another example comment text.",
//               author: "user4",
//               children: [],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       id: 4,
//       text: "Example comment here 2.",
//       author: "user5",
//       children: [],
//     },
//   ],
// };
