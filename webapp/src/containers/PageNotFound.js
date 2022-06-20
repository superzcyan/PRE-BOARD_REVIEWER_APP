import React from "react";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="flex flex-col space-y-4 h-screen items-center justify-center content-center">
      <div className="">Error: 404 Page Not Found</div>
      <Link to="/" className="w-fit text-center">
        Go Back
      </Link>
    </div>
  );
};

export default PageNotFound;
