import React from 'react';

const Error = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col text-center">
          <h1>Oops!</h1>
          <p>We can't seem to find the page you're looking for.</p>
          <a href="/" className="btn btn-primary">Go Home</a>
        </div>
      </div>
    </div>
  );
};

export default Error;
