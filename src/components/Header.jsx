import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import React from "react";
import * as utils from "../utils";
import * as actions from "../actions";
import * as reducers from "../reducers";

const Header = () => {
  return (
    <header className="bg-white shadow p-4">
      <div className="container flex justify-between items-center">
        <h1 className="text-lg font-bold">
          <Link to="/">My Application</Link>
        </h1>
        <nav>
          <Link to="/" className="mx-2">Home</Link>
          <Link to="/history" className="mx-2">History</Link>
          <Link to="/contact" className="mx-2">Contact</Link>
          <Link to="/settings" className="mx-2">Settings</Link>
        </nav>
      <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;