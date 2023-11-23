import React, { useContext, useEffect, useState } from 'react';
import FacultyInviteCard from './FacultyInviteCard';
import axios from 'axios';
//import FacultyContext from '../context/FacultyContext'; // Adjust the path based on your project structure
import NoteContext from '../context/NoteContext';
import { UserContext } from '../App';
let cr=0;
var id = "";

function FacultyInvites() {
  // const { state: facultyState } = useContext(FacultyContext);
  const a=useContext(NoteContext);
  const { state, dispatch } = useContext(UserContext);
  dispatch({ type: 'User', payload: true });

  const [facultyInvites, setFacultyInvites] = useState([]);
  //TODO : seach id from faculty table using faculty name
  var facName = a.state.username;


  const getUserDetails= async (e) =>{
    try{

const userDataResponse = await axios.get(`http://localhost:5000/api/faculty/${facName}`);
      if (userDataResponse.status === 200) {
    const userData = userDataResponse.data;
  // console.log("username :",username);

    // Update the user state with user information
    dispatch({
      type: 'User',
      payload: {
       facId:userData.fac_id
      },
    });
    // console.log('Fac ID:', userData.fac_id);
    // console.log('datas:', userData);
    // console.log('datas:', userData.facultyInvites.fac_id);
    id = userData.fac_id;
  
  }
    }
    catch(e){
      // console.log("ERROR");
    }
  }
  getUserDetails();
  if(cr==0){
  cr++;
  }
  // console.log("ID: ",id);
  useEffect(() => {
    const fetchFacultyInvites = async () => {
      try {
        // Use the faculty name from the context to make the API request
        const response = await axios.get(`http://localhost:5000/api/facultyinvites/${id}`);
        if (response.data.success) {
          setFacultyInvites(response.data.facultyInvites);
        } else {
          console.error('Error fetching faculty invites:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching faculty invites:', error);
      }
    };
    fetchFacultyInvites();
  }, [id]); // Include facultyState.fullname as a dependency
  // console.log(facultyInvites);
  return (
    <div>
      {facultyInvites.map((invite) => (
        <FacultyInviteCard
          key={invite.invite_id}
          teamName={invite.teamname}
          teamId={invite.team_id}
          domain={invite.domain}
          members={invite.members}
        />
      ))}
    </div>
  );
}

export default FacultyInvites;

/*import React from 'react'
import FacultyInviteCard from './FacultyInviteCard'



function FacultyInvites() {
    const teams = [
    {
      TeamName:"Plans ante",
      TeamId:"42069",
      Domain:"abduction",//name of the project they are working under
      Members: "XX1 , XX2 , XX3 , XX4"
    },
    {
      TeamName:"MILF",
      TeamId:"420",
      Domain:".....",
      Members: "XX1 , XX2 , XX3 , XX4"
    },
    {
      TeamName:"Your Love",
      TeamId:"69",
      Domain:"minor",
      Members: "XX1 , XX2 , XX3 , XX4"
    },
    {
      TeamName:"(* ; *){/?/} (",
      TeamId:"69096",
      Domain:"habibi",
      Members: "XX1 , XX2 , XX3 , XX4"
    },
  ];
  return(
       <div>

        {teams.map((team) => (
        <FacultyInviteCard
          teamName={team.TeamName} // ProvstudentIde a unique key for each card
          teamId={team.TeamId}
          domain={team.Domain}
          members={team.Members}
          
        />
      ))}
    </div>
  );
}

export default FacultyInvites; */
