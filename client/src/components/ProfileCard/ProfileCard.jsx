import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import { getUser } from "../../helpers/index";

import { makeStyles, Paper } from "@material-ui/core";

import CircularLoader from "../loader/CircularLoader";

const useStyles = makeStyles((theme) => ({
  profileHeader: {
    height: "150px",
    backgroundColor: "rgb(102, 51, 255)",
    padding: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  profileInfo: {
    padding: theme.spacing(3),
  },
  name: {
    lineHeight: "27px",
    fontWeight: "700",
    fontSize: "28px",
    textDecoration: "none",
    textTransform: "uppercase",
    "&:visited:": {
      color: "inherit",
    },
  },
  profile: {
    lineHeight: "24px",
    color: "hsl(208, 11%, 34%)",
    fontWeight: "700",
  },
  value: {
    lineHeight: "24px",
    color: "black",
    fontWeight: "500",
  },
}));

function ProfileCard(props) {
  const classes = useStyles();
  const [authorData, setAuthorData] = useState({});
  const [loader, setLoader] = useState(false);
  const { authorId } = props;

  useEffect(() => {
    setLoader(true);
    getUser(authorId).then((data) => {
      setAuthorData(data.data);
      setLoader(false);
    });
  }, []);
  return (
    <Paper elevation={3}>
      <div className={classes.profileHeader}>
        <div className={classes.profileImg}>
          <img src={authorData.profileImage} className={classes.profileImage} />
        </div>
      </div>
      <div>
        {loader ? (
          <CircularLoader />
        ) : (
          <div className={classes.profileInfo}>
            <Link
              to={{
                pathname: `/user/${authorData.name} ${authorData.lastname}`,
                state: { userId: authorData._id },
              }}
              className={classes.name}
            >{`${authorData.name} ${authorData.lastname}`}</Link>
            <br />
            {authorData.profile !== "" && (
              <div>
                <p className={classes.profile}>{authorData.profile}</p>
                <br />
              </div>
            )}
            {authorData.location !== "" && (
              <div>
                <p className={classes.profile}>LOCATION</p>
                <p className={classes.value}>{authorData.location}</p>
                <br />
              </div>
            )}
            <div>
              <p className={classes.profile}>JOINED</p>
              <p className={classes.value}>
                {moment(authorData.created_at).format("MMM Do YY")}
              </p>
            </div>
          </div>
        )}
      </div>
    </Paper>
  );
}

export default ProfileCard;
