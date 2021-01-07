import React, { useState, useEffect } from "react";
import { List, CellMeasurerCache, CellMeasurer } from "react-virtualized";
import { makeStyles, Grid } from "@material-ui/core";

//?importing COMPONENTS
import FilterBar from "../components/filterbar/FilterBar.jsx";
import PostCard from "../components/postCard/postCard";
import NavBar from "../core/navbar/NavBar";

//?importing APIS
import { getAllPostsOnlyPublished } from "../helpers/index";
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

    getAllPostsOnlyPublished().then((data) => {
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
            likes: e.likes,
            comments: e.comments,
            date: new Date(e.updatedAt).toDateString(),
          },
        ]);
      });
      setLoader(false);
    });
  }, []);

  
  const home = () => {
    return (
      <div style={{ padding: "100px 10px 10px 10px" }}>
        <Grid container className={classes.mainContainer}>
          <Grid item lg={9} className={classes.postContainerStyle}>
            <FilterBar />
            <div className={classes.centeringDiv}>
              {posts.map((post, index) => {
                return (
                  <PostCard
                    isLoading={loader}
                    key={index}
                    author={post.author.fullname}
                    author_id={post.author.id}
                    profileImage={post.author.profileImage}
                    date={post.date}
                    title={post.title}
                    id={post._id}
                    likes={post.likes}
                    comments={post.comments}
                  />
                );
              })}

              {loader && <PostCard isLoading={loader} />}
            </div>
          </Grid>
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

// const [cache, setCache] = useState(
//   new CellMeasurerCache({
//     fixedWidth: true,
//     defaultHeight: 100,
//   })
// );

// const rowRenderer = ({ index, key, style, parent }) => {
//   return (
//     <CellMeasurer
//       key={key}
//       cache={cache}
//       parent={parent}
//       columnIndex={0}
//       rowIndex={index}
//     >
//       <div style={style}>
//         <PostCard
//           key={key}
//           author={posts[index].author.fullname}
//           author_id={posts[index].author.id}
//           profileImage={posts[index].author.profileImage}
//           date={posts[index].date}
//           title={posts[index].title}
//           id={posts[index]._id}
//           likes={posts[index].likes}
//           comments={posts[index].comments}
//         />
//       </div>
//     </CellMeasurer>
//   );
// };
