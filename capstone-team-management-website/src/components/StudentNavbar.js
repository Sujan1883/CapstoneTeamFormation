import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
// import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../App';

function StudentNavbar() {
  const {state , dispatch} = useContext(UserContext);

    const handleLogout = () => {
    // Update the user's authentication state to false when logging out
    dispatch({ type: "User", payload: false });
  };
  return (
     <nav className='navbar'>
      <div className='navbar-container'>
         
          <Link to='/' className='navbar-logo' >
            Team-UP
          </Link>
        <ul className= 'nav-menu'>
        <li className='nav-item'>
          <Link to="/faculty" className='nav-links'>Faculty</Link>
        </li>

        <li className='nav-item'>
          <Link to="/teaminfo" className='nav-links'>Team</Link>
        </li>
        <li className='nav-item'>
          <Link to="/Project" className='nav-links'>Project</Link>
        </li>
        <li className='nav-item'>
          <Link to="/profile" className='nav-links'>Profile</Link>
        </li>
       
        <li >
          <Link to="/login" className='nav-links' onClick={handleLogout}>Logout</Link>
        </li>
        
        </ul>
        
      </div>
    </nav>
  )
}

export default StudentNavbar