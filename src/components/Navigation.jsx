import React from "react";
import { Link } from "react-router-dom";
import * as utils from "../utils";
import * as actions from "../actions";
import * as reducers from "../reducers";

const Navigation = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container flex justify-center">
        <Link to="/" className="mx-2">Home</Link>
        <Link to="/history" className="mx-2">History</Link>
        <Link to="/contact" className="mx-2">Contact</Link>
        <Link to="/settings" className="mx-2">Settings</Link>
      </div>
    </nav>
  );
};

export default Navigation;