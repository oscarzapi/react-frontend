import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Profile from "../src/user/Profile";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";
import FindPeople from "./user/FindPeople";
import NewPost from "./post/NewPost";
import EditPost from "./post/EditPost";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import SinglePost from "./post/SinglePost";

import PrivateRoute from "./auth/PrivateRoute";

const MainRouter = () => {
  return (
    <div>
      <Menu></Menu>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route
          exact
          path="/reset-password/:resetPasswordToken"
          component={ResetPassword}
        />
        <PrivateRoute
          exact
          path="/post/create"
          component={NewPost}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/post/edit/:postId"
          component={EditPost}
        ></PrivateRoute>
        <Route exact path="/post/:postId" component={SinglePost}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/signin" component={Signin}></Route>
        <PrivateRoute
          exact
          path="/user/:userId"
          component={Profile}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/user/edit/:userId"
          component={EditProfile}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/findpeople"
          component={FindPeople}
        ></PrivateRoute>

        <Route exact path="/users" component={Users}></Route>
      </Switch>
    </div>
  );
};

export default MainRouter;
