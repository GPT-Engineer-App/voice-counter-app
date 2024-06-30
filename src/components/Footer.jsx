import React from "react";
import * as utils from "../utils";
import * as actions from "../actions";
import * as reducers from "../reducers";

const Footer = () => {
  return (
    <footer className="bg-white shadow p-4 mt-auto">
      <p className="text-center">© {new Date().getFullYear()} My Application. All rights reserved.</p>
    </footer>
  );
};

export default Footer;