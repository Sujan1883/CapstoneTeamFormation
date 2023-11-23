import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import NoteContext from '../context/NoteContext';
import './FacultyInviteCard.css'
import axios from 'axios'; 
import {useContext} from 'react';
var id="";

function FacultyInviteCard({ teamId, teamName,domain,members }) {
  const a=useContext(NoteContext);
  const navigate = useNavigate();
  var uName = a.state.username;
  var facName = a.state.username;
  const { state, dispatch } = useContext(UserContext);
  const handleAcceptClick = async (teamId) => {
    try {
      console.log("Team id ",teamId);
      // Make an HTTP request to the server endpoint to accept the faculty invite
      // const response = await axios.post(`http://localhost:5000/api/acceptFacultyInvite/${teamId}`);

      // if (response.data.success) {
      //   // Optionally, you can update local state or perform other actions upon successful acceptance
      //   console.log('Faculty invite accepted successfully');
        
         
      // } else {
      //   // Handle failure, if needed
      //   console.error('Error accepting faculty invite:', response.data.message);
      // }

      const response = await axios.put(`http://localhost:5000/api/updateStatus/${teamId}/${facName}`);

      if (response.data.success) {
        // Optionally, you can update local state or perform other actions upon successful acceptance
        console.log('Updated status successfully');
        
         
      } else {
        // Handle failure, if needed
        console.error('Error updating status:', response.data.message);
      }

      //delete from factulty Invites
      // const resp = await axios.post(`http://localhost:5000/api/deleteFacultyInvite/${teamId}`);


      //Added
    const userDataResponse = await axios.get(`http://localhost:5000/api/facultyidfetch/${facName}`);
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
        console.log("ID: ",id);
      
      }
      
      //Added
      //Todo : facuty if in team table 
      //axios to update domaiin as domain from team id
      //var id=1;
      const response2 = await axios.post(`http://localhost:5000/api/updateFacID/${teamId}`,{
        facid:id
      });
      console.log("facid: ",id);

      if (response2.data.success) {
        // Optionally, you can update local state or perform other actions upon successful acceptance
        console.log('Faculty invite accepted successfully');
        
         
      } else {
        // Handle failure, if needed
        console.error('Error accepting faculty invite:', response2.data.message);
      }
      
    } catch (error) {
      console.error('Error accepting faculty invite:', error);
    }
  };


  const handleDeclineClick = async (teamId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/declineFacultyInvite/${teamId}`);

      if (response.data.success) {
        // Optionally, you can update local state or perform other actions upon successful acceptance
        console.log('Faculty invite deleted successfully');
        
         
      } else {
        // Handle failure, if needed
        console.error('Error delete faculty invite:', response.data.message);
      }
    } catch (error) {
      console.error('Error declining faculty invite:', error);
    }
    // Navigate("/facultyinvites")
    console.log("NAVIGATING");
    console.log("NAVIGATING");
    console.log("NAVIGATING");
    console.log("NAVIGATING");
    console.log("NAVIGATING");
    console.log("NAVIGATING");
    console.log("NAVIGATING");
    console.log("NAVIGATING");
    console.log("NAVIGATING");
    navigate('/facultyinvites');
  };
  return (
    <div className="team-invites-card">
     <div className='team-info wrapper'>
      <div className="team-name">
        <p>{teamName}</p>
      </div>
      <div className="team-id">
        <p>id : {teamId}</p>
      </div>
      <div className="team-id">
        <p>Domian : {domain}</p>
      </div>
      <div>
        <p className='team-members'>{members}</p>
      </div> 
      </div>
      <div className="button-container">
        <button className="accept-button" onClick={() => handleAcceptClick(teamId)}>
          Accept
        </button>
        <button className="decline-button" onClick={() => handleDeclineClick(teamId)} >
          Decline
        </button>
      </div>
    </div>
  );
}

export default FacultyInviteCard;