import React from "react";
import Posts from "../post/Posts";

const Home = () => {
  return (
    <div>
      <div className="jumbotron">
        <h2>Home</h2>
        <p className="lead">Welcome to React</p>
      </div>
      <div className="container">
        <Posts></Posts>
      </div>
    </div>
  );
};

export default Home;
