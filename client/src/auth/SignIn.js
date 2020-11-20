import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import debounce from "lodash/debounce";

import { signin, authenticate } from "./helper/index";
import AlertComponent from "../components/Alert/AlertComponent";
import CircularLoader from "../components/loader/CircularLoader";
import "./auth.css";
import NavBar from "../core/navbar/NavBar";

import { Paper, makeStyles, Grid } from "@material-ui/core";

//? for formik
import { Formik, Form, Field } from "formik";
import { Button, Typography } from "@material-ui/core";
import { TextField } from "formik-material-ui";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  paperStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "aliceblue",
    padding: "16px",
    width: "400px",
  },
  maingrid: {
    width: "80%",
    marginTop: theme.spacing(2),
  },
  subgrid: {
    margin: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
  },
}));

export default function SignIn() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const [state, setState] = useState({
    errorMessage: "",
    isError: false,
    didRedirect: "",
  });
  const { didRedirect, errorMessage, isError } = state;

  useEffect(() => {
    debounce(() => {
      console.log("triggered");
      setState({
        ...state,
        errorMessage: "",
        isError: false,
      });
    }, 1000);
  }, [errorMessage, isError]);

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/" />;
    }
  };

  const valSigninForm = () => {
    return (
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};
          //email validation
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          //password validation
          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 3) {
            errors.password = "Password must be more than 3 letters";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setLoader(true);
          signin(values).then((data) => {
            setSubmitting(false);
            setLoader(false);
            if (data.status === 200) {
              authenticate(data.data, () => {
                setState({
                  ...state,
                  isError: false,
                  errorMessage: "",
                  didRedirect: true,
                });
                dispatch({
                  type: "SIGN_IN",
                  payload: {
                    name: data.data.user.name,
                    lastname: data.data.user.lastname,
                    email: data.data.user.email,
                    role: data.data.user.role,
                    id: data.data.user._id,
                  },
                });
              });
            } else if (data.status >= 400) {
              setState({
                errorMessage: JSON.parse(data.response).error,
                isError: true,
                didRedirect: false,
              });
            } else {
              setState({
                errorMessage: "Something went wrong! Try Again.",
                isError: true,
                didRedirect: false,
              });
            }
          });
        }}
      >
        {({ submitForm, isSubmitting, touched, errors }) => (
          <div className={classes.container}>
            <Paper elevation={3} className={classes.paperStyle}>
              <Typography variant="h3">Login</Typography>

              <Grid container className={classes.maingrid}>
                <Grid item xs={12} className={classes.subgrid}>
                  <Field
                    component={TextField}
                    name="email"
                    type="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className={classes.subgrid}>
                  <Field
                    component={TextField}
                    name="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className={classes.subgrid}>
                  <h4>
                    New User? Click{" "}
                    <Link to="/signup" className={classes.link}>
                      here
                    </Link>{" "}
                    to SignUp
                  </h4>
                </Grid>
                <Grid item xs={12} className={classes.subgrid}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={submitForm}
                    disabled={isSubmitting}
                    fullWidth
                  >
                    {loader ? <CircularLoader /> : <>Log In</>}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </div>
        )}
      </Formik>
    );
  };

  return (
    <div className="center">
      <NavBar />
      {isError && <AlertComponent severity="error" message={errorMessage} />}
      {performRedirect()}
      {valSigninForm()}
    </div>
  );
}
