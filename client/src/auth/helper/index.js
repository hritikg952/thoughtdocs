import axios from "axios";
const API = process.env.REACT_APP_BACKEND || "http://localhost:5500/api";
// API = "http://localhost:5500/api"

export const signin = (data) => {
  return axios
    .post(`${API}/signin`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err.request) {
        return err.request;
      } else if (err.response) {
        return err.response;
      } else {
        return err;
      }
    });
};

export const signup = (data) => {
  return axios
    .post(`${API}/signup`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err.request) {
        return err.request;
      } else if (err.response) {
        return err.response;
      } else {
        return err;
      }
    });
};

export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");

    return axios
      .get(`${API}/signout`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAutheticated = () => {
  if (localStorage.getItem("jwt")) {
    console.log("isAuthenticated true");
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    console.log("isAuthenticated false");
    return false;
  }
};

export const getLoggedInUserId = () => {
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt")).user._id;
    // return localStorage.getItem("jwt").user._id;
  } else {
    return undefined;
  }
};
