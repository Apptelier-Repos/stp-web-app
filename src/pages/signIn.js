import React from "react";

class SignIn extends React.Component {
  state = {
    userAccounts: []
  };

  componentDidMount() {
    fetch("https://stp-web-api.azurewebsites.net/api/values")
      .then(res => res.json())
      .then(data => {
        this.setState({ userAccounts: data });
      })
      .catch(console.log);
  }

  render() {
    return (
      <>
        <p>Sign in</p>
        <p>{this.state.userAccounts.map(ua => `${ua.id}: ${ua.username}`).join(", ")}</p>
      </>
    );
  }
}

export default SignIn;
