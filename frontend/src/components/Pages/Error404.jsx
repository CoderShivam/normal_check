import React from "react";

const Error404 = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ fontSize: "4rem", color: "#ff0000" }}>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you are looking for does not exist or has been moved.</p>
      <a href="/" style={{ color: "#007bff", textDecoration: "none", fontSize: "1.2rem" }}>
        Go back to Home
      </a>
    </div>
  );
};

export default Error404;
