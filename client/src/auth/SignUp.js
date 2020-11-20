import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { signup } from "./helper/index";
import AlertComponent from "../components/Alert/AlertComponent";
import "./auth.css";
import NavBar from "../core/navbar/NavBar";
import CircularLoader from "../components/loader/CircularLoader";

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
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const [state, setState] = useState({
    errorMessage: "",
    isError: false,
    didRedirect: "",
  });
  const { didRedirect, errorMessage, isError } = state;

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/signin" />;
    }
  };

  const valSignUpForm = () => {
    return (
      <Formik
        initialValues={{
          name: "",
          lastname: "",
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

          if (!values.name) {
            errors.name = "Required";
          }

          if (!values.lastname) {
            errors.lastname = "Required";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setLoader(true);
          signup(values).then((data) => {
            setSubmitting(false);
            setLoader(false);
            if (data.status === 200) {
              setState({
                isError: false,
                errorMessage: "",
                didRedirect: true,
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
              <Typography variant="h3">Register</Typography>
              <Grid container className={classes.maingrid}>
                <Grid item xs={12} className={classes.subgrid}>
                  <Field
                    component={TextField}
                    name="name"
                    type="text"
                    label="Name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className={classes.subgrid}>
                  <Field
                    component={TextField}
                    name="lastname"
                    type="text"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
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
                    Already a User? Click{" "}
                    <Link to="/signin" className={classes.link}>
                      here
                    </Link>{" "}
                    to Login
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
                    {loader ? <CircularLoader /> : <>Sign Up</>}
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
      {valSignUpForm()}
    </div>
  );
}

// const handleChange = (name) => (event) => {
//   setState({ ...state, [name]: event.target.value });
// };

// const handleSubmit = (event) => {
//   event.preventDefault();
//   signup({ name, lastname, email, password }).then((data) => {
//     if (data.status === 200) {
//       setState({
//         ...state,
//         name: "",
//         lastname: "",
//         email: "",
//         password: "",
//         error: "",
//         didRedirect: true,
//       });
//     } else if (data.response) {
//       setState({
//         ...state,
//         error: JSON.parse(data.response).error,
//         didRedirect: false,
//       });
//     } else {
//       setState({
//         ...state,
//         error: "Something went wrong!",
//         didRedirect: false,
//       });
//     }
//   });
// };

// const signinform = () => {
//   return (
//     <div className={classes.container}>
//       <Paper elevation={3} className={classes.paperStyle}>
//         <Typography variant="h3">Register</Typography>
//         <Grid container className={classes.maingrid}>
//           <Grid item xs={12} className={classes.subgrid}>
//             <TextField
//               id="name"
//               label="Name"
//               variant="outlined"
//               value={name}
//               onChange={handleChange("name")}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} className={classes.subgrid}>
//             <TextField
//               id="lastname"
//               label="Last Name"
//               variant="outlined"
//               value={lastname}
//               onChange={handleChange("lastname")}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} className={classes.subgrid}>
//             <TextField
//               id="email"
//               label="Email"
//               variant="outlined"
//               value={email}
//               onChange={handleChange("email")}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} className={classes.subgrid}>
//             <TextField
//               id="password"
//               label="Password"
//               variant="outlined"
//               type="password"
//               value={password}
//               onChange={handleChange("password")}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} className={classes.subgrid}>
//             <h4>
//               Already a User? Click{" "}
//               <Link to="/signup" className={classes.link}>
//                 here
//               </Link>{" "}
//               to Login
//             </h4>
//           </Grid>
//           <Grid item xs={12} className={classes.subgrid}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={(e) => handleSubmit(e)}
//               fullWidth
//             >
//               Sign Up
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>
//     </div>
//   );
// };
