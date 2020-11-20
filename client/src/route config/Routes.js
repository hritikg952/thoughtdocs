import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoutes from "./protectedRoutes";
import Home from "../pages/Home";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import WriteAPost from "../pages/WriteAPost/WriteAPost";
import ReadPage from "../pages/ReadPost/ReadPost";
import UserProfile from "../pages/UserProfile/UserProfile";
import EditProfile from "../pages/EditProfile/EditProfile";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <ProtectedRoutes exact path="/writeapost" component={WriteAPost} />
        <Route
          exact
          path="/post/:id"
          render={(props) => <ReadPage {...props} />}
        />
        <Route
          exact
          path="/user/:name"
          // component={UserProfile}
          render={(props) => <UserProfile {...props} />}
        />
        <ProtectedRoutes
          exact
          path="/edit/:name"
          component={EditProfile}
          // render={(props) => <EditProfile {...props} />}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
