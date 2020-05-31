import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9900" };
  else return { color: "#ffffff" };
};

const Menu = ({ history }) => {
  // getting history to get the active link
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" to="/" style={isActive(history, "/")}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/users"
            style={isActive(history, "/users")}
          >
            Users
          </Link>
        </li>

        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signin"
                style={isActive(history, "/signin")}
              >
                SignIn
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signup"
                style={isActive(history, "/signup")}
              >
                SignUp
              </Link>
            </li>
          </>
        )}

        {isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={`/findpeople`}
                style={isActive(history, `/findpeople`)}
              >
                Find People
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={`/post/create`}
                style={isActive(history, `/post/create`)}
              >
                Create Post
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={`/user/${isAuthenticated().user._id}`}
                style={isActive(history, `/user/${isAuthenticated().user._id}`)}
              >
                {`${isAuthenticated().user.name}´s profile`}
              </Link>
            </li>
            <li className="nav-item">
              <span
                className="nav-link"
                style={
                  (isActive(history, "/signup"),
                  { cursor: "pointer", color: "#ffffff" })
                }
                onClick={() => signout(() => history.push("/"))}
              >
                Sign Out
              </span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
