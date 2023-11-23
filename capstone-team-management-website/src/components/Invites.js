import React, { useContext, useEffect, useState } from 'react';
import InviteCard from './InviteCard'
import axios from 'axios';
import NoteContext from '../context/NoteContext';
import { UserContext } from '../App';

export const Invites = () => {
  const a=useContext(NoteContext);
  var lName = a .state.username;
  const { state, dispatch } = useContext(UserContext);
  dispatch({ type: 'User', payload: true });

  const [teamFetch, setTeamFetch] = useState([]);
  useEffect(() => {
  const fetchTeam = async () => {
    try {
      // Use the faculty name from the context to make the API request
      const response = await axios.get(`http://localhost:5000/api/teamfetch/${lName}`);
      if (response.data.success) {
        setTeamFetch(response.data.teamFetch);
      } else {
        console.error('Error fetching team det:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching team dets:', error);
    }
  };
  fetchTeam();
}, [lName]); // Include facultyState.fullname as a dependency
console.log("Team Det" ,teamFetch);
    // Add more student objects as needed
;
//Fetch invtes fusing leadername from teaminvites table
  return (
    <div>

        {teamFetch.map((student) => (
        <InviteCard
          // ProvstudentIde a unique key for each card
          studentName={student.member_name}
          
        />
      ))}
    </div>
  )
}
