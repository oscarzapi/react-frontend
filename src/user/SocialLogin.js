import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { socialLogin, authenticate } from "../auth";
import { Redirect } from "react-router-dom";
class SocialLogin extends Component {
  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
    };
  }

  responseGoogle = (response) => {
    console.log(response);
    const { googleId, name, email, imageUrl } = response.profileObj;
    const user = {
      password: googleId,
      name: name,
      email: email,
      imageUrl: imageUrl,
    };
    // console.log("user obj to social login: ", user);
    socialLogin(user).then((data) => {
      console.log("signin data: ", data);
      if (data.error) {
        console.log("Error Login. Please try again..");
      } else {
        console.log("signin success - setting jwt: ", data);
        authenticate(data, () => {
          this.setState({ redirectToReferrer: true });
        });
      }
    });
  };

  render() {
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <GoogleLogin
          clientId="497772087790-4d5go25lfob296es6ahe1mvn67hd2i0l.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
      </div>
    );
  }
}

export default SocialLogin;
