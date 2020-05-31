import React, { Component } from "react";
import { list } from "../user/apiUser";
import ImageProfile from "../images/avatar.png";
import { Link } from "react-router-dom";
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

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
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Users</h2>
        {this.renderUsers(users)}
      </div>
    );
  }
}

export default Users;
