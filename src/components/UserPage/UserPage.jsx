import React from "react";

import LogOutButton from "../LogOutButton/LogOutButton";
import AddPizza from "../AddPizza/AddPizza";
import ViewPizzaList from "../ViewPizzaList/ViewPizzaList";

import SearchPizza from "../SearchPizza/SearchPizza";
import PizzaList from "../PizzaList/PizzaList";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <br></br>
      {/* Add Pizza route to Search Page*/}
      <Link to="/SearchPizza">
        <button className="btn">Add Pizza</button>
      </Link>

      {/* View Pizza List route to Pizza List*/}
      {/* <Link to="/PizzaList">
      <button className="btn">Pizza List</button>
    </Link> */}

      {/* <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" /> */}

      <PizzaList />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
