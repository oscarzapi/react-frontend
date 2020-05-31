import React, { Component } from "react";
import { isAuthenticated } from "../auth/index";
import { remove } from "./apiUser";
import { signout } from "../auth/index";
import { Redirect } from "react-router-dom";

class DeleteUser extends Component {
  state = {
    redirect: false,
  };
  deleteAccount = () => {
    const token = isAuthenticated().token;
    const userId = this.props.userId;
    remove(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        //   signout user
        signout(() => console.log("User is deleted"));
        //   redirect
        this.setState({
          redirect: true,
        });
      }
    });
    console.log("Account deleted");
  };
  deleteConfirmed = () => {
    let answer = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (answer) {
      this.deleteAccount();
    }
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <button
        className="btn btn-raised btn-danger"
        onClick={this.deleteConfirmed}
      >
        Delete profile
      </button>
    );
  }
}

export default DeleteUser;
