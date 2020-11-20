import React, { useState, useEffect } from "react";
import { trackPromise } from "react-promise-tracker";
import { Container, makeStyles, Paper, Grid } from "@material-ui/core";

//?importing COMPONENTS
import LoginCard from "../components/loginCard/LoginCard";
import FilterBar from "../components/filterbar/FilterBar.jsx";
import PostCard from "../components/postCard/postCard";
import NavBar from "../core/navbar/NavBar";
import ReadPage from "../pages/ReadPost/ReadPost";
import CircularLoader from "../components/loader/CircularLoader.jsx";

//?importing APIS
import { getAllPosts } from "../helpers/index";
import { isAutheticated } from "../auth/helper/index";
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    justifyContent: "center",
  },
  paperStyle: {
    backgroundColor: "aliceblue",
    padding: "10px",
    height: "auto",
  },
  centeringDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function Home() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);

  //? fetching posts on initial render
  useEffect(() => {
    setPosts([]);
    setLoader(true);

    getAllPosts().then((data) => {
      data.data.map((e) => {
        setPosts((prevVal) => [
          ...prevVal,
          {
            author: {
              fullname: `${e.author.name} ${e.author.lastname}`,
              id: e.author._id,
              profileImage: e.author.profileImage,
            },
            title: e.title,
            _id: e._id,
            date: new Date(e.created_at).toDateString(),
          },
        ]);
      });
      setLoader(false);
    });
  }, []);

  const home = () => {
    return (
      <div style={{ padding: "10px" }}>
        <Grid container className={classes.mainContainer}>
          <Grid item lg={9} className={classes.postContainerStyle}>
            <Paper elevation={3} className={classes.paperStyle}>
              <FilterBar />
              <div className={classes.centeringDiv}>
                {posts.map((post, index) => {
                  return (
                    <PostCard
                      key={index}
                      author={post.author.fullname}
                      author_id={post.author.id}
                      profileImage={post.author.profileImage}
                      date={post.date}
                      title={post.title}
                      id={post._id}
                    />
                  );
                })}
                {loader && <CircularLoader />}
              </div>
            </Paper>
          </Grid>
          {/* <Grid item lg={3}></Grid> */}
        </Grid>
      </div>
    );
  };

  return (
    <div>
      <NavBar />
      {home()}
    </div>
  );
}
export default Home;
