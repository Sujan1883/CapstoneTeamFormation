import React, { useState, useEffect } from 'react';
import './Faculty.css'; // Import the CSS file for styling
import axios from 'axios';
import TeamContext from '../context/TeamContext';
import { useLocation } from 'react-router-dom';
import {useContext} from 'react';
import App, { UserContext } from '../App';
import NoteContext from '../context/NoteContext';
var tname="";
var tid="";
let ct =0;

function Faculty() {
  ct=0;
  const a=useContext(NoteContext);
  var uName = a.state.username;
  var inTeam = a.state.teamname===""?false:true;
  // console.log("ijuhg: ",a.state.teamname);
  // console.log("hiui"+inTeam);
  const { state: teamState } = useContext(TeamContext);
  const { state: userState } = useContext(UserContext);
  const { state, dispatch } = useContext(UserContext);
  dispatch({ type: 'Team', payload: true });

  const data = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [facultyMembers, setFacultyMembers] = useState([]);
  console.log("faculty ",a.state.teamname);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const fetchTeamDet = async () => {
    try {
      // console.log("User Name : "+uName);
      const response = await axios.post(`http://localhost:5000/api/fetchTeamDet/${uName}`);
  
      if (response.data.success) {
        // Optionally, you can update local state or perform other actions upon successful acceptance
        // console.log('Accepted successfully');
        const userData = response.data;
  
        // Update the user state with user information
        dispatch({
          type: 'User',
          payload: {
            teamn: userData.teamname,
            teami: userData.teamid
          },
        });
  
        tname = userData.teamname;
        tid = userData.teamid;
        // console.log("Tname: ", tname);
        // console.log("Tid: ", tid);
  
        // TODO: Add trigger to reduce noOf slots t by 1
      } else {
        // Handle failure, if needed
        console.error('Error accepting:', response.data.message);
      }
    } catch (error) {
      console.error('Error in fetchTeamDet:', error);
      // Handle other potential errors here
    }
  };
  if(ct<10){
    ct++;
  fetchTeamDet();
}
  const handleInvite = (faculty) => {
    // You need to replace 'your-api-endpoint' with the actual server endpoint
    // console.log("Sample",a.state.teamname);
    axios.post('http://localhost:5000/api/facultyinvites', {
      facultyId: faculty.fac_id,
      facultyName: faculty.fullname,
      domain: faculty.domain,
      teamName: tname,
      teamId: tid,
    })
    .then(response => {
      if (response.data.success) {
        console.log('Faculty invited successfully.');
        // You can add additional logic here if needed
      } else {
        console.error('Error inviting faculty:', response.data.message);
      }
    })
    .catch(error => {
      console.error('Error inviting faculty:', error);
    });
  };

  useEffect(() => {
    // Fetch faculty members from the server when the component mounts
    axios.get('http://localhost:5000/api/faculty')
    .then(response => {
      if (response.data.success) {
        setFacultyMembers(response.data.facultyMembers);
      } else {
        console.error('Error fetching fmem:', response.data.message);
      }
    })
    .catch(error => {
      console.error('Error fetching fmem:', error);
    });
  }, []); // Empty dependency array ensures this effect runs only once, like componentDidMount
  // Filter faculty members based on the name and search term
  const filteredFacultyMembers = facultyMembers.filter(faculty =>
    faculty.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // if(inTeam){
    console.log("FFM : "+filteredFacultyMembers);
    if(tname!=""){
  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Faculty By Name"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className='FSearch'>Search</button>
      </div>
      <hr />
      <div className="faculty-list">
        {filteredFacultyMembers.map((faculty, index) => (
          <div key={index} className="faculty-item">
            <div className="column-display">
              <h3 className='FName'>{faculty.fullname}</h3>
              <p className='FId'> {faculty.fac_id}</p>
              <p className='FDomain'>Domain : {faculty.domain}</p>
            </div>
            <button className="invite-button" onClick={() => handleInvite(faculty)}>Invite</button>
            {/* {index < filteredFacultyMembers.length - 1 && <hr />} Separator line except for the last faculty */}
          </div>
        ))}
      </div>
    </div>
  );
        }
        else{
          <div>
            <h1>shd be in team</h1>
          </div>
        }
        // }
        // else{
        //   <div>
        //     Shd be in team first to invite faculty 
        //   </div>
        // }
}

export default Faculty;
