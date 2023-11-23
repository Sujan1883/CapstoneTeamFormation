import  { useContext, useEffect } from 'react';
import TeamInfo from './TeamInfo';
import TeamList from './TeamList';
import NoteContext from '../context/NoteContext';
import axios from 'axios';
import App, { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Loginpage.css';
//import axios from 'axios'; // Import Axios
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
//import NoteContext from '../context/NoteContext';
//import { useContext,useEffect } from 'react';


var temp = -1;
function TeamUtils() {
  var hasStream = 0;

  const a = useContext(NoteContext);
  
//   console.log("team utils ", a.state.username);

  // Access dispatch from the context
//   const { dispatch } = useContext(NoteContext);
const { state, dispatch } = useContext(UserContext);

  async function Fetchuserd() {
    var username = a.state.username;
    console.log("typeof ",typeof username);
    try {
      console.log("insideee1");

      const userDataResponse = await axios.get(`http://localhost:5000/api/user/${username}`);
      console.log("insideeee2");
      console.log(userDataResponse.status)
      
      if (userDataResponse.status === 200) {

          const userData = userDataResponse.data;
          console.log("herhe");
          console.log("username :",username);
          dispatch({ type: 'User', payload: true });
        // Update the user state with user information
        
        dispatch({
          type: 'User',
          payload: {
            username,
            role: userData.role,
            userid: userData.userid,
            hasteam: userData.hasteam,
          },
        });
        console.log("herhe2");

        temp = userData.hasteam;
        hasStream=temp;
        console.log("INTeam : "+temp);
        console.log('User ID:', userData.userid);
        console.log('User Role:', userData.role);
        console.log('User Role:', userData.hasteam);
      }
    } catch (e) {
        console.log("error");
      console.error(e);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await Fetchuserd();
      console.log("team ", temp);
      hasStream=temp;

    }
    
    fetchData();
  }, []);// Empty dependency array to run this effect only once

  //fethasteram for that usename 
  console.log("inteam : "+temp);
  if (temp === 1) {
    return (
      <TeamInfo />
      );
    } else {
      return (
        <TeamList />
    );
  }
}

export default TeamUtils;
