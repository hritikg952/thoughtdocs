import React, { useState, useEffect } from "react";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { Grid, makeStyles, Paper, Hidden, IconButton } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import NavBar from "../../core/navbar/NavBar";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Comments from "../../components/comments/Comments";
import {
  getPost,
  getUserLikedPostList,
  toggleLike,
  getLikesOfPost,
} from "../../helpers/index";
import { getLoggedInUserId } from "../../auth/helper/index";
import "./ReadPost.css";
import CircularLoader from "../../components/loader/CircularLoader";
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    position: "relative",
  },
  postContainer: {
    padding: theme.spacing(5),
  },
  heading: {
    fontWeight: "700",
    fontSize: "3rem",
  },
  reactsSidebar: {
    position: "fixed",
    left: 40,
    margin: "50px 0",
  },

  reactsStyle: {
    display: "block",
  },
}));

function ReadPost(props) {
  const classes = useStyles();
  const logged_in_user_id = getLoggedInUserId();
  const { id, author_id } = props.location.state;
  const [loader, setLoader] = useState(false);
  const [postData, setPostData] = useState({});
  const [likes, setLikes] = useState(0);
  const [authorData, setAuthorData] = useState({});
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [likedPostList, setLikedPostList] = useState([]);
  useEffect(() => {
    setLoader(true);
    getPost(author_id, id).then((data) => {
      setLikes(data.data.likes);
      setPostData(data.data);
      setLoader(false);
      const contentState = convertFromRaw(JSON.parse(data.data.content));
      setEditorState(EditorState.createWithContent(contentState));
    });
    getUserLikedPostList(logged_in_user_id).then((data) => {
      setLikedPostList(data.data);
    });
  }, []);

  useEffect(() => {
    likedPostList.map((likedPost) => {
      if (likedPost === postData._id) {
        setIsPostLiked(true);
      }
    });
  }, [postData, likedPostList]);

  const likePost = (e) => {
    e.preventDefault();
    toggleLike(logged_in_user_id, postData._id, "like").then((data) => {
      if (data.status === 200) {
        setIsPostLiked(!isPostLiked);
        setLikes(likes + 1);
      }
    });
  };

  const unlikePost = (e) => {
    e.preventDefault();
    toggleLike(logged_in_user_id, postData._id, "unlike").then((data) => {
      if (data.status === 200) {
        setIsPostLiked(!isPostLiked);
        setLikes(likes - 1);
      }
    });
  };

  const readpost = () => {
    return (
      <div style={{ padding: "100px 10px 10px 10px" }}>
        <Grid container className={classes.mainContainer} spacing={1}>
          <Hidden smDown>
            <Grid item contianer md={1}>
              <Grid item xs={12} className={classes.reactsSidebar}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "700",
                  }}
                >
                  <IconButton
                    className={classes.reactsStyle}
                    onClick={(e) => {
                      isPostLiked ? unlikePost(e) : likePost(e);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      style={{ color: isPostLiked ? "#ec5858" : "" }}
                    />
                  </IconButton>
                  {postData.likes ? <p>{likes}</p> : <p>0</p>}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "700",
                  }}
                >
                  <IconButton className={classes.reactsStyle}>
                    <FontAwesomeIcon icon={faComment} />
                  </IconButton>
                  {postData.comments ? (
                    <p>{postData.comments.length}</p>
                  ) : (
                    <p>0</p>
                  )}
                </div>
              </Grid>
            </Grid>
          </Hidden>
          <Grid container item xs={12} md={8} spacing={1}>
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
            <Grid item md={3} className={classes.authorContainer}>
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
