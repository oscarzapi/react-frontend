import React, { Component } from "react";
import { findPeople, follow } from "../user/apiUser";
import ImageProfile from "../images/avatar.png";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
class FindPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      error: "",
      open: false,
      followMessage: "",
    };
  }

  componentDidMount() {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    findPeople(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

  clickFollow = (user, index) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    follow(userId, token, user._id).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        let toFollow = this.state.users;
        toFollow.splice(index, 1);
        this.setState({
          users: toFollow,
          open: true,
          followMessage: `Following ${user.name}`,
        });
      }
    });
  };

  renderUsers = (users) => {
    return (
      <div className="row">
        {users.map((user, index) => {
          return (
            <div className="card col-md-4 mr-4" key={index}>
              <img
                className="img-thumbnail"
                src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                alt={user.name}
                style={{ height: "200px", width: "auto" }}
                onError={(i) => (i.target.src = `${ImageProfile}`)}
              ></img>
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <Link to={`/user/${user._id}`}>
                  <span href="#" className="btn btn-raised btn-primary btn-sm">
                    View profile
                  </span>
                </Link>
                <button
                  className="btn btn-raised btn-info float-right btn-sm"
                  onClick={() => this.clickFollow(user, index)}
                ></button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  render() {
    const { users, open, followMessage } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Users</h2>
        {open && (
          <div className="alert alert-success">
            {open && <p>{followMessage}</p>}
          </div>
        )}
        {this.renderUsers(users)}
      </div>
    );
  }
}

export default FindPeople;
