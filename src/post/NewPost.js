import React, { Component } from "react";
import { isAuthenticated } from "../auth/index";
import { Redirect } from "react-router-dom";
import { create } from "./apiPost";
import ImageProfile from "../images/avatar.png";

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      photo: "",
      error: "",
      user: {},
      fileSize: 0,
      loading: false,
      redirectToProfile: false,
    };
  }

  componentDidMount() {
    this.postData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;

    if (fileSize > 1000000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false,
      });
      return false;
    }

    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }
    return true;
  };

  handleChange = (type) => (event) => {
    this.setState({ error: "" });
    const value = type === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = type === "photo" ? event.target.files[0].size : 0;
    this.postData.set(type, value);
    this.setState({ [type]: value, fileSize });
  };
  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, this.postData).then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({
            loading: false,
            title: "",
            body: "",
            photo: "",
            redirectToProfile: true,
          });
          console.log("New Post: ", data);
        }
      });
    }
  };

  newPostForm = (title, body) => {
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
          <label className="text-muted">Title</label>
          <input
            className="form-control"
            type="text"
            onChange={this.handleChange("title")}
            value={title}
          ></input>
        </div>

        <div className="form-group">
          <label className="text-muted">Body</label>
          <textarea
            className="form-control"
            type="text"
            onChange={this.handleChange("body")}
            value={body}
          ></textarea>
        </div>

        <button
          onClick={this.clickSubmit}
          className="btn btn-raised btn-primary"
        >
          Create Post
        </button>
      </form>
    );
  };

  render() {
    const {
      id,
      title,
      body,
      photo,
      user,
      error,
      loading,
      redirectToProfile,
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${user._id}`}></Redirect>;
    }

    return (
      <div className="container">
        <h2>Create New Post</h2>
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
        {this.newPostForm(title, body)}
      </div>
    );
  }
}

export default NewPost;
