import React from "react";
import { Link } from "react-router-dom";
import "./NoMatch.css";

const NoMatch = () => {
  return (
    <div className="no-match-container">
      <h1 className="no-match-title">404</h1>
      <p className="no-match-message">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="no-match-link">
        Go Back Home
      </Link>
    </div>
  );
};

export default NoMatch;
