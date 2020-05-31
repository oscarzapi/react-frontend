import React, { Component } from "react";
import { isAuthenticated } from "../auth/index";
import { read } from "./apiUser";
import { Redirect } from "react-router-dom";
import { update, updateUser } from "./apiUser";
import ImageProfile from "../images/avatar.png";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      email: "",
      password: "",
      redirectToProfile: false,
      error: "",
      fileSize: 0,
      loading: false,
      about: "",
    };
  }

  init = (userId) => {
    const token = isAuthenticated().token;
    read(userId, token).then((data) => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          error: "",
          about: data.about,
        });
      }
    });
  };

  componentDidMount() {
    this.userData = new FormData();
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  isValid = () => {
    const { name, email, password, fileSize } = this.state;

    if (fileSize > 1000000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false,
      });
      return false;
    }

    if (name.length === 0) {
      this.setState({ error: "Name is required", loading: false });
      return false;
    }
    // email@domain.com
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({ error: "Valid email is required", loading: false });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({
        error: "Password must be at least 6 characters long",
        loading: false,
      });
      return false;
    }
    return true;
  };

  handleChange = (type) => (event) => {
    this.setState({ error: "" });
    const value = type === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = type === "photo" ? event.target.files[0].size : 0;
    this.userData.set(type, value);
    this.setState({ [type]: value, fileSize });
  };
  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;

      update(userId, token, this.userData).then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else
          updateUser(data, () => {
            this.setState({
              redirectToProfile: true,
            });
          });
      });
    }
  };

  signupForm = (name, email, password, about) => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Profile photo</label>
          <input
            onChange={this.handleChange("photo")}
            type="file"
            accept="image/*"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            className="form-control"
            type="text"
            onChange={this.handleChange("name")}
            value={name}
          ></input>
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            className="form-control"
            type="email"
            onChange={this.handleChange("email")}
            value={email}
          ></input>
        </div>
        <div className="form-group">
          <label className="text-muted">About</label>
          <textarea
            className="form-control"
            type="text"
            onChange={this.handleChange("about")}
            value={about}
          ></textarea>
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            className="form-control"
            type="password"
            onChange={this.handleChange("password")}
            value={password}
          ></input>
        </div>
        <button
          onClick={this.clickSubmit}
          className="btn btn-raised btn-primary"
        >
          Update
        </button>
      </form>
    );
  };

  render() {
    const {
      id,
      name,
      email,
      password,
      redirectToProfile,
      error,
      loading,
      about,
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`}></Redirect>;
    }

    const photoUrl = id
      ? `${
          process.env.REACT_APP_API_URL
        }/user/photo/${id}?${new Date().getTime()}`
      : ImageProfile;

    return (
      <div className="container">
        <h2>Edit profile</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}

        <img
          className="img-thumbnail"
          src={photoUrl}
          alt={name}
          style={{ height: "200px", width: "auto" }}
          onError={(i) => (i.target.src = `${ImageProfile}`)}
        ></img>
        {this.signupForm(name, email, password, about)}
      </div>
    );
  }
}

export default EditProfile;
