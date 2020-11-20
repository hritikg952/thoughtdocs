import React, { useEffect, useState } from "react";

import {
  Paper,
  Grid,
  makeStyles,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";

import NavBar from "../../core/navbar/NavBar";
import AlertComponent from "../../components/Alert/AlertComponent";

import { getUser, updateUser, updateProfileImage } from "../../helpers/index";
const useStyles = makeStyles((theme) => ({
  editContainer: {
    padding: theme.spacing(3),
  },
  uploadImageContainer: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  input: {
    display: "none",
  },
  imagePreview: {
    height: "90px",
    width: "90px",
    borderRadius: "50%",
    marginRight: "10px",
    objectFit: "cover",
  },
}));
function EditProfile(props) {
  const classes = useStyles();
  const [profileImage, setProfileImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState({
    alertMessage: "",
    isError: false,
  });
  const { alertMessage, isError } = alert;
  const [details, setDetails] = useState({
    email: "",
    name: "",
    lastname: "",
    location: "",
    bio: "",
    fbUrl: "",
    instaUrl: "",
    linkInUrl: "",
  });
  const {
    email,
    name,
    lastname,
    location,
    profile,
    fbUrl,
    instaUrl,
    linkInUrl,
  } = details;

  useEffect(() => {
    getUser(props.location.state.userId).then((data) => {
      setDetails({
        ...details,
        email: data.data.email,
        name: data.data.name,
        lastname: data.data.lastname,
        location: data.data.location,
        profile: data.data.profile,
        fbUrl: data.data.fbUrl,
        instaUrl: data.data.instaUrl,
        linkInUrl: data.data.linkInUrl,
      });
    });
  }, []);

  const handleChange = (name) => (e) => {
    setDetails({ ...details, [name]: e.target.value });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    setProfileImage(e.target.files[0]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoader(true);
    // append image data if image is uploaded by user
    const formdata = new FormData();
    if (profileImage !== null) {
      formdata.append("profileImage", profileImage);
      updateProfileImage(props.location.state.userId, formdata).then((data) => {
        if (data.status >= 400) {
          setAlert({
            alertMessage: "Cannot update profile image! Try again.",
            isError: true,
          });
        }
      });
    }

    updateUser(props.location.state.userId, details).then((data) => {
      setLoader(false);
      if (data.status === 200) {
        window.location.reload(false);
      } else if (data.status >= 400) {
        setAlert({
          alertMessage: JSON.parse(data.response).error,
          isError: true,
        });
      } else {
        setAlert({
          alertMessage: "Something went wrong! Try again.",
          isError: true,
        });
      }
    });
  };

  const editprofile = () => {
    return (
      <div style={{ padding: "10px" }}>
        <Grid container justify="center" spacing={2}>
          <Grid item lg={8}>
            <Paper elivation={3} className={classes.editContainer}>
              <Grid container spacing={3}>
                <Grid item lg={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    size="small"
                    value={email}
                    onChange={handleChange("email")}
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    fullWidth
                    label="First name"
                    variant="outlined"
                    size="small"
                    value={name}
                    onChange={handleChange("name")}
                  />
                </Grid>
                <Grid item lg={6}>
                  <TextField
                    fullWidth
                    label="Last name"
                    variant="outlined"
                    size="small"
                    value={lastname}
                    onChange={handleChange("lastname")}
                  />
                </Grid>
                <Grid item lg={12}>
                  <TextField
                    multiline
                    rows={3}
                    fullWidth
                    label="A short bio..."
                    variant="outlined"
                    size="small"
                    value={profile}
                    onChange={handleChange("profile")}
                  />
                </Grid>
                <Grid item lg={12}>
                  <TextField
                    fullWidth
                    label="Location "
                    placeholder="eg: Delhi,India"
                    variant="outlined"
                    size="small"
                    value={location}
                    onChange={handleChange("location")}
                  />
                </Grid>
                <Grid item lg={12}>
                  <Typography variant="h6">Profile Image</Typography>
                  <div className={classes.uploadImageContainer}>
                    {profileImage && (
                      <img
                        src={URL.createObjectURL(profileImage)}
                        className={classes.imagePreview}
                      />
                    )}
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Upload
                      </Button>
                    </label>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item lg={8}>
            <Paper elivation={3} className={classes.editContainer}>
              <Typography variant="h4">Links</Typography>
              <Grid container spacing={3}>
                <Grid item lg={12}>
                  <TextField
                    fullWidth
                    label="Facebook Profile URL"
                    placeholder="https://facebook.com/..."
                    variant="outlined"
                    size="small"
                    value={fbUrl}
                    onChange={handleChange("fbUrl")}
                  />
                </Grid>
                <Grid item lg={12}>
                  <TextField
                    fullWidth
                    label="Instagram Profile URL"
                    placeholder="https://..."
                    variant="outlined"
                    size="small"
                    value={instaUrl}
                    onChange={handleChange("instaUrl")}
                  />
                </Grid>
                <Grid item lg={12}>
                  <TextField
                    fullWidth
                    label="LinkedIn Profile URL"
                    placeholder="https://..."
                    variant="outlined"
                    size="small"
                    value={linkInUrl}
                    onChange={handleChange("linkInUrl")}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item lg={8}>
            <Paper elivation={3} className={classes.editContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => handleSave(e)}
              >
                Save
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  };
  return (
    <>
      <NavBar />
      {isError && <AlertComponent message={alertMessage} severity="error" />}
      {editprofile()}
    </>
  );
}

export default EditProfile;
