import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import {
  Paper,
  Grid,
  makeStyles,
  Button,
  Typography,
  Hidden,
} from "@material-ui/core";
import CakeIcon from "@material-ui/icons/Cake";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import NavBar from "../../core/navbar/NavBar";
import { getUser, getUserPostList } from "../../helpers/index";
import { isAutheticated } from "../../auth/helper/index";
import PostCard from "../../components/postCard/postCard";
import CircularLoader from "../../components/loader/CircularLoader";

const useStyles = makeStyles((theme) => ({
  userInfo: {
    padding: theme.spacing(2),
  },
  topSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(3),
    // backgroundColor:
  },
  midSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: theme.spacing(3),
  },
  midSectionMoreInfo: {
    fontSize: "1.3rem",
    color: "#64707D",
    display: "flex",
    justifyContent: "space-around",
  },
  profileImg: {
    width: "80px",
    height: "80px",
    borderRadius: "100%",
    backgroundColor: "cyan",
    backgroundImage: `url('../../assets/images/icons8-user-64.png')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  profileImage: {
    width: "80px",
    height: "80px",
    borderRadius: "100%",
    objectFit: "cover",
  },
  editButton: {
    // height: theme.spacing(5)
    backgroundColor: "rgb(17, 199, 231)",
    border: "none",
    borderRadius: "5px",
    color: "black",
    transformStyle: "flat",
    transition: "all 250ms ease-out",
    "&:hover": {
      backgroundColor: "rgb(7, 110, 151)",
    },
  },
  postContainer: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function UserProfile(props) {
  const classes = useStyles();

  const authenticated = isAutheticated();
  const visibility =
    authenticated !== false &&
    authenticated.user._id === props.location.state.userId;

  const [userDetails, setUserDetails] = useState({});
  const [loader, setLoader] = useState(false);
  const [userPostDetails, setUserPostDetails] = useState([]);
  useEffect(() => {
    getUser(props.location.state.userId).then((data) => {
      setUserDetails(data.data);
    });
    setLoader(true);
    getUserPostList(props.location.state.userId).then((data) => {
      setLoader(false);
      setUserPostDetails(data.data);
    });
  }, []);

  const UserProfilePage = () => {
    return (
      <div style={{ padding: "100px 10px 10px 10px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid item lg={11}>
            <Paper elevation={3} className={classes.userInfo}>
              <Grid container justify="center" className={classes.subContainer}>
                <Grid item lg={12} className={classes.topSection}>
                  {/* <Hidden mdDown>
                    <div></div>
                  </Hidden> */}

                  {visibility && (
                    <Button
                      variant="contained"
                      color="primary"
                      classes={{ root: classes.editButton }}
                      component={Link}
                      to={{
                        pathname: `/edit/${userDetails.name}${userDetails.lastname}`,
                        state: { userId: userDetails._id },
                      }}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Grid>
                <Grid item lg={9} className={classes.midSection}>
                  <div className={classes.profileImg}>
                    <img
                      src={userDetails.profileImage}
                      className={classes.profileImage}
                    />
                  </div>
                  <Typography
                    variant="h3"
                    style={{
                      paddingBottom: "1.5rem",
                      fontWeight: "700",
                      textTransform: "uppercase",
                    }}
                  >{`${userDetails.name} ${userDetails.lastname}`}</Typography>
                  {userDetails.profile === "" ? (
                    <Typography
                      variant="h5"
                      style={{ paddingBottom: "1.5rem" }}
                    >
                      404 bio not found
                    </Typography>
                  ) : (
                    <Typography
                      variant="h5"
                      style={{ paddingBottom: "1.5rem" }}
                    >
                      {userDetails.profile}
                    </Typography>
                  )}
                  <div className={classes.midSectionMoreInfo}>
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "15px",
                      }}
                    >
                      <CakeIcon style={{ marginRight: "10px" }} />
                      Joined on{" "}
                      {moment(userDetails.created_at).format("MMM Do YY")}
                    </p>

                    {userDetails.location && (
                      <p
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <LocationOnIcon style={{ marginRight: "10px" }} />
                        {userDetails.location}
                      </p>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item lg={11}>
            <Paper elivation={3} className={classes.postContainer}>
              {loader ? (
                <CircularLoader />
              ) : userPostDetails.length > 0 ? (
                userPostDetails.map((post, index) => {
                  console.log(post);
                  return (
                    <PostCard
                      key={index}
                      author={`${post.author.name} ${post.author.lastname}`}
                      author_id={post.author._id}
                      date={moment(post.created_at).format("MMM Do YY")}
                      title={post.title}
                      id={post._id}
                      likes={post.likes}
                      comments={post.comments}
                      published={post.published}
                      isSwitch={visibility}
                      isDelete={visibility}
                    />
                  );
                })
              ) : (
                <Paper
                  elivation={3}
                  style={{
                    padding: "30px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h3">
                    Click <Link to="/writeapost">here</Link> to write your first
                    post!
                  </Typography>
                </Paper>
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  };
  return (
    <>
      {NavBar()}
      {UserProfilePage()}
    </>
  );
}

export default UserProfile;
