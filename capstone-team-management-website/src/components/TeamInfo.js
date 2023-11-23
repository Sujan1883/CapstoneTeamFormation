// src/components/Contact.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {useContext} from 'react';
import axios from 'axios';
import './TeamInfo.css'
import NoteContext from '../context/NoteContext';
import { UserContext } from '../App';
var m="",mem="";
const TeamInfo = () => {
  const a=useContext(NoteContext);
  var lName=a.state.username;
  const [fetchTeams, setFetchTeams] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  dispatch({ type: 'User', payload: true });

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        // Use the faculty name from the context to make the API request
        const response = await axios.get(`http://localhost:5000/api/fetchteamdetails/${lName}`);
        if (response.data.success) {
          setFetchTeams(response.data.userFetch);
        } else {
          console.error('Error fetching user det:', response.data.message);
        }

        //TODO : get user members type array then 
        const res = await axios.get(`http://localhost:5000/api/getmember/${lName}`);
        if (res.status === 200) {
          const userData = res.data;
        // console.log("username :",username);
      
          // Update the user state with user information
          dispatch({
            type: 'User',
            payload: {
             mem:userData.members
            },
          });
          // console.log('Fac ID:', userData.fac_id);
          // console.log('datas:', userData);
          // console.log('datas:', userData.facultyInvites.fac_id);
          mem = userData.members;
          m="";
          for (let i = 0; i < mem.length; i++) {
            if (mem[i] != lName) {
              m += mem[i];
            }
            if(i!=mem.length-1 &&mem[i] != lName)
              m+=',';
          }
          console.log("Memebers  ",m);
        }
      } catch (error) {
        console.error('Error fetching user dets:', error);
      }
    };
    fetchTeamDetails();
  }, [lName]); // Include facultyState.fullname as a dependency
  console.log("Team Det" ,fetchTeams);


  return (
     
    <div className = 'bgImg'>
      <Link to="/invites" className="view-invites-button">
        View Invites 
      </Link>
      {/* <h2>Team Details</h2> */}
         <div className="team-info-card">
      <h2>Team Information</h2>
      <div className="team-details">
        {fetchTeams.map((team) => (
            <>
              <p><strong>Team Name: </strong>{team.teamname}</p>
              <p><strong>Team Id: </strong>{team.teamid}</p>
              <p><strong>Team Leader:</strong>{team.leadername}</p>
              {/* Include other user details */}
            </>
          ))}
      </div>
      <div className="member-details">
      {fetchTeams.map((team) => (
        <h5> Members: {m}</h5>
        ))}
        {/*<ul>
          <li>Member 1: MEMBER001</li>
          <li>Member 2: MEMBER002</li>
          <li>Member 3: MEMBER003</li>
          {/* Add more member IDs as needed 
      </ul>*/}

      </div>
      <div className="member-details">
      {fetchTeams.map((team) => (
        <h4>Faculty ID:{team.facultyid}</h4>
        ))}
        
      </div>
    </div>
      {/* <p>Contains info about team</p> */}
    </div>
  );
};

export default TeamInfo;
