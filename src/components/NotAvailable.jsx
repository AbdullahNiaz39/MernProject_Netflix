import React from "react";

const NotAvailable = ({ movie }) => {
  return movie ? (
    <h1 className="not-available">No Movies available for selected genre</h1>
  ) : (
    <h1 className="not-available">No TV Shows available for selected genre</h1>
  );
};

export default NotAvailable;
