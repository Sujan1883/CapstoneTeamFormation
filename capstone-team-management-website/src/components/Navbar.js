import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App';
import StudentNavbar from './StudentNavbar';
import FacultyNavbar from './FacultyNavbar';
import NoteContext from '../context/NoteContext';
import axios from 'axios'
import { useEffect } from 'react';
var role1="";
const Navbar = () => {
  
  const a=useContext(NoteContext);
  const { state, dispatch } = useContext(UserContext);
  // console.log("UNameeeeee eeee  eee ",a.state.username);
  var uname = a.state.username;
  // Use the user's role from the context
  var role = state ? state.role : null;
  // console.log("HEhehehehehhehe1");
  console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUNAME : ",uname);
  // if(role1 ===""){
    // console.log("HEhehehehehhehe");
    //TODO fetch role fromm username from users tabel
    // useEffect(() => {
      const getUserDetails = async () => {
        try {
          console.log("Inside user details");
          const userDataResponse = await axios.get(`http://localhost:5000/api/facultynav/${uname}`);
          if (userDataResponse.status === 200) {
            const userData = userDataResponse.data;
            
            dispatch({
              type: 'User',
              payload: {
                rol: userData.role
              },
            });
  
            role1 = userData.role;
          }
        } catch (error) {
          // Handle errors here
        }
      };
  
      getUserDetails(); // Call the function when the component mounts
  
      // If you need uname as a dependency for this effect, add it to the dependency array
    // }, []);
  // }
  const logout = () => {
    // Update the user's authentication state to false when logging out
    dispatch({ type: "User", payload: false });
    // role=null;
  }; 
  // console.log("role : "+role);
  console.log("roleeeeeeeeeeeeeeeeee1 : "+role1);
  if (state) {
    if (role1 === "student" ) {
      return (
        <StudentNavbar />
      );
    } else {
      return (
        <FacultyNavbar />
      );
    }
  } else {
    return (
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo'>
            Team-UP
          </Link>
          <ul className='nav-menu'>
            <li>
              <Link to="/register" className='nav-links'>Register</Link>
            </li>
            <li>
              <Link to="/login" className='nav-links'>Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};

export default Navbar;
