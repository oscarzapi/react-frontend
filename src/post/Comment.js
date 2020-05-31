import React, { Component } from "react";
import { comment, uncomment } from "./apiPost";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import ImageProfile from "../images/postProfile.jpg";
class Comment extends Component {
  state = {
    text: "",
    error: "",
  };

  handleChange = (event) => {
    this.setState({ error: "" });
    this.setState({ text: event.target.value });
  };

  isValid = () => {
    const { text } = this.state;
    if (!text.length > 0 || text.length > 150) {
      this.setState({
        error: "Comment should not be empty and less than 150 characters long",
      });
      return false;
    }
    return true;
  };

  addComment = (e) => {
    e.preventDefault();

    if (!isAuthenticated()) {
      this.setState({ error: "Please sign in to leave a comment" });
      return false;
    }

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const postId = this.props.postId;
      const token = isAuthenticated().token;
      const commentToSend = { text: this.state.text };

      comment(userId, token, postId, commentToSend).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({
            text: "",
          });
          // dispatch fresh list of comments to parent singlepost
          this.props.updateComments(data.comments);
        }
      });
    }
  };

  deleteComment = (comment) => {
    const userId = isAuthenticated().user._id;
    const postId = this.props.postId;
    const token = isAuthenticated().token;

    uncomment(userId, token, postId, comment).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // dispatch fresh list of comments to parent singlepost
        this.props.updateComments(data.comments);
      }
    });
  };

  deleteConfirmed = (comment) => {
    let answer = window.confirm(
      "Are you sure you want to delete your comment?"
    );
    if (answer) {
      this.deleteComment(comment);
    }
  };

  render() {
    const { comments } = this.props;
    const { error } = this.state;
    return (
      <div>
        <h2 className="mt-5 mb-5"> Leave a comment</h2>
        <form onSubmit={this.addComment}>
          <div className="form-group">
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              value={this.state.text}
              placeholder="Leave a comment..."
            ></input>
            <button className="btn btn-raised btn-success mt-2">Submit</button>
          </div>
        </form>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        <div className="col-md-12">
          <h3 className="text-primary">
            {comments.length}
            {"  "}Comments
          </h3>
          <hr></hr>
          {comments.map((comment, index) => {
            return (
              <div key={index}>
                <div>
                  <Link to={`/user/${comment.postedBy._id}`}>
                    <img
                      className="float-left mr-2"
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                      alt={comment.postedBy.name}
                      onError={(i) => (i.target.src = `${ImageProfile}`)}
                      height="30px"
                      style={{
                        borderRadius: "50%",
                        border: "1px solid black",
                      }}
                    ></img>
                  </Link>
                  <div>
                    <p className="lead">{comment.text}</p>
                    <p className="font-italic mark">
                      Posted by{" "}
                      <Link to={`${comment.postedBy._id}`}>
                        {comment.postedBy.name}
                        {"  "}
                      </Link>
                      on {new Date(comment.created).toDateString()}
                      {isAuthenticated().user &&
                        isAuthenticated().user._id === comment.postedBy._id && (
                          <>
                            <span
                              className="text-danger float-right mr-1"
                              style={{ cursor: "pointer" }}
                              onClick={() => this.deleteConfirmed(comment)}
                            >
                              Remove
                            </span>
                          </>
                        )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Comment;
