import React, { useState, useEffect, useContext } from 'react';
import './FacultyTeams.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../App'; // Import the UserContext if not already imported
import NoteContext from '../context/NoteContext';

var id="";
let cr=0;
let count= 0;
function FacultyTeams() {
  //const { state } = useContext(UserContext);
  const [facultyTeams, setFacultyTeams] = useState([]);

  const a=useContext(NoteContext);

  const { state, dispatch } = useContext(UserContext);
  // console.log("Uname eee :",a.state.username);
  // const role = state ? state.role : null;
  // console.log("roleeeeeeeeee : "+role);
  dispatch({ type: 'User', payload: true });

  //const [facultyInvites, setFacultyInvites] = useState([]);
  //TODO : seach id from faculty table using faculty name
  var facName = a.state.username;

  // console.log("FAculty treams");
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

    //TODO fetch count of numbers with fac id in 
    const countResponse = await axios.get(`http://localhost:5000/api/countteams/${facName}`);
    count = countResponse.data.teamCount
    console.log("COUNt  : ",count);
    //console.log(payload);
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
  console.log("ID: ",id);
  useEffect(() => {
    const fetchFacultyTeams = async () => {
      try {
        // Use the faculty name from the context to make the API request
        const response = await axios.get(`http://localhost:5000/api/facultyteams/${id}`);
        if (response.data.success) {
          setFacultyTeams(response.data.facultyTeams);
        } else {
          console.error('Error fetching faculty teams:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching faculty teams:', error);
      }
    };

    fetchFacultyTeams();
  }, [id]); // Include facultyState.fullname as a dependency
  console.log(facultyTeams);

  // useEffect(() => {
  //   // Fetch faculty teams handled by the logged-in faculty
  //   const fetchFacultyTeams = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/facultyteams/${state.facId}`);
  //       if (response.data.success) {
  //         setFacultyTeams(response.data.teams);
  //       } else {
  //         console.error('Error fetching faculty teams:', response.data.message);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching faculty teams:', error);
  //     }
  //   };

  //   fetchFacultyTeams();
  // }, [state.facId]); // Include state.facId as a dependency

  return (
    <div>
      <div> No of teams : {count}</div>
      <Link to="/facultyinvites" className="view-button">
        View Invites
      </Link>
      <div className='teams-container' >
        {facultyTeams && facultyTeams.map((team, index) => (
          <div key={index} className="project-box">
            <div className ='spacebtw'>
              <h3 className='teamName'>{team.teamname}</h3>
              <div className="teamId">id : {team.team_id}</div>
            </div>
            <p className="Domain">{team.domain}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacultyTeams;
