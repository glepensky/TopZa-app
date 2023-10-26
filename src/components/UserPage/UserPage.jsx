import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import AddPizzaButton from '../AddPizzaButton/AddPizzaButton';
import ViewPizzaList from '../ViewPizzaList/ViewPizzaList';
import HallOfFame from '../HallOfFame/HallOfFame';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>

    {/* Add Pizza route to Search Page*/}
      <AddPizzaButton className="btn" />
      
    {/* View Pizza List route to Pizza List*/}
      <ViewPizzaList className="btn" />

    {/* Hall of Fame */}
      <HallOfFame className="btn" />

      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
