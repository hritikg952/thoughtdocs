import React from "react";
import { Link } from "react-router-dom";
import { Paper, Grid, Typography, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  profileButton: {
    margin: "10px 0",
    width: "100%",
  },
  paperStyle: {
    backgroundColor: "aliceblue",
    padding: "10px",
    height: "200px",
  },
  containerStyle: {},
  textStyle: {
    fontWeight: "600",
    margin: "10px 0 10px 15px",
  },
}));

function LoginCard() {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.paperStyle}>
      <Grid container className={classes.containerStyle}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.textStyle}>
            Join Doc Thoughts
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            className={classes.profileButton}
            size="large"
            style={{ backgroundColor: "lightgreen" }}
            component={Link}
            to={`/signup`}
          >
            Sign Up
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            className={classes.profileButton}
            size="large"
            style={{ backgroundColor: "lightblue" }}
            component={Link}
            to={`/signin`}
          >
            Log In
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default LoginCard;
