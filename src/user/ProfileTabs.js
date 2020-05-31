import React, { Component } from "react";
import ImageProfile from "../images/avatar.png";
import { Link } from "react-router-dom";
import Posts from "../post/Posts";

class ProfileTabs extends Component {
  render() {
    const { following, followers, posts } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <h3 className="text-primary">Followers</h3>
            <hr></hr>
            {followers.map((person, index) => {
              return (
                <div key={index}>
                  <div>
                    <Link to={`/user/${person._id}`}>
                      <img
                        className="float-left mr-2"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                        alt={person.name}
                        onError={(i) => (i.target.src = `${ImageProfile}`)}
                        height="30px"
                        style={{
                          borderRadius: "50%",
                          border: "1px solid black",
                        }}
                      ></img>
                      <div>
                        <p className="lead">{person.name}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="col-md-4">
            <h3 className="text-primary">Following</h3>
            <hr></hr>
            {following.map((person, index) => {
              return (
                <div key={index}>
                  <div>
                    <Link to={`/user/${person._id}`}>
                      <img
                        className="float-left mr-2"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                        alt={person.name}
                        onError={(i) => (i.target.src = `${ImageProfile}`)}
                        height="30px"
                        style={{
                          borderRadius: "50%",
                          border: "1px solid black",
                        }}
                      ></img>
                      <div>
                        <p className="lead">{person.name}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="col-md-4">
            <h3 className="text-primary">Posts</h3>
            <hr></hr>
            {posts.map((post, index) => {
              return (
                <div key={index}>
                  <div>
                    <Link to={`/post/${post._id}`}>
                      <div>
                        <p className="lead">{post.title}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileTabs;
