import React, { Component } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate() {
    const { hasError } = this.state;
    if (hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an Error", error, info);
  }

  render() {
    const { hasError, redirect } = this.state;
    const { children } = this.props;

    if (redirect) {
      return <Redirect to="/" />;
    }

    if (hasError) {
      return (
        <h1>
          There was an error with this listing.
          <Link to="/">Click Here</Link>
          to go back to the home page or wait for 5 seconds.
        </h1>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
