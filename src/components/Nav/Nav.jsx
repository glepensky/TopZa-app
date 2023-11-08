import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import topazlogo from "./topzalogo.png"; // Ensure the path to your logo is correct

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <div className="nav-logo-container">
        <img src={topazlogo} alt="topaz logo" className="nav-logo" />
      </div>
      <div className="nav-links-container">
        {/* If no user is logged in, show these links */}
        {!user.id && (
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            {/* <Link className="navLink" to="/gallery">
              Gallery
            </Link> */}
            <Link className="navLink" to="/about">
              About
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
