import { useContext } from 'react';
import { UserContext } from '../App';
import './InviteCard.css'
import NoteContext from '../context/NoteContext';
import axios from 'axios';
function InviteCard({ studentId, studentName }) {
  const a=useContext(NoteContext);
  var lName = a .state.username;
  var mem ="";
  var cur="";
  const { state, dispatch } = useContext(UserContext);
  dispatch({ type: 'User', payload: true });

  const handleAcceptClick = async () => {
    try {
      console.log("lName ",lName);
      // Make an HTTP request to the server endpoint to accept the faculty invite
      // const response = await axios.post(`http://localhost:5000/api/fetchmemb/${lName}`);

      // if (response.data.success) {
      //   // Optionally, you can update local state or perform other actions upon successful acceptance
      //   console.log('accepted successfully');
      //   const userData = response.data;
      //   // console.log("username :",username);
      
      //     // Update the user state with user information
      //     dispatch({
      //       type: 'User',
      //       payload: {
      //        mem:userData.members
      //       },
      //     });
      //     // console.log('Fac ID:', userData.fac_id);
      //     // console.log('datas:', userData);
      //     // console.log('datas:', userData.facultyInvites.fac_id);
      //     mem = userData.members;
      //     console.log("Members : "+ mem);

      //     cur=studentName;

      //     var newMem = mem+","+studentName;
      //     console.log("newmwmbers : "+ newMem);

      //     //TODO add trigger to reduce noOf slots t by 1
      // } else {
      //   // Handle failure, if needed
      //   console.error('Error accepting:', response.data.message);
      // }

      // const response1 = await axios.put(`http://localhost:5000/api/updatememb/${lName}`,{
      //   newMembers:newMem
      // });

      // if (response1.data.success) {
      //   // Optionally, you can update local state or perform other actions upon successful acceptance
      //   console.log('Updating accepted successfully');
        
        
      // } else {
      //   // Handle failure, if needed
      //   console.error('Error accepting Update:', response1.data.message);
      // }


      const resp = await axios.post(`http://localhost:5000/api/deleteRequest/${lName}/${studentName}`);
      if (resp.data.success) {
        // Optionally, you can update local state or perform other actions upon successful acceptance
        console.log('Deleting accepted successfully');
        
        
      } else {
        // Handle failure, if needed
        console.error('Error accepting Delete:', resp.data.message);
      }


      const acceptInvite = await axios.post(`http://localhost:5000/api/acceptInvite/${lName}/${studentName}`);
      
      //axios to update domaiin as domain from team id
      const updateNoofSlot = await axios.put(`http://localhost:5000/api/updateslot/${lName}`);

    } catch (error) {
      console.error('Error accepting faculty invite:', error);
    }
  };
  const handleDeclineClick = async () => {
    try {
      console.log("lName ",lName);
      // Make an HTTP request to the server endpoint to accept the faculty invite
      const response = await axios.post(`http://localhost:5000/api/fetchmemb/${lName}`);

      if (response.data.success) {
        // Optionally, you can update local state or perform other actions upon successful acceptance
        console.log('accepted successfully');
        const userData = response.data;
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
          console.log("Members : "+ mem);

          cur=studentName;


          //TODO add trigger to reduce noOf slots t by 1
      } else {
        // Handle failure, if needed
        console.error('Error accepting:', response.data.message);
      }


      const resp = await axios.post(`http://localhost:5000/api/deleteRequest/${lName}/${cur}`);
      if (resp.data.success) {
        // Optionally, you can update local state or perform other actions upon successful acceptance
        console.log('Deleting accepted successfully');
        
        
      } else {
        // Handle failure, if needed
        console.error('Error accepting Delete:', resp.data.message);
      }



      //axios to update domaiin as domain from team id
    } catch (error) {
      console.error('Error accepting faculty invite:', error);
    }
  };
  return (
    <div className="student-card">
     <div className='student-info wrapper'>
      <div className="student-name">
        <p>{studentName}</p>
      </div>
    
      </div>
      <div className="button-container">
        <button className ="accept-button" onClick={() => handleAcceptClick()}>
          Accept
        </button> 
        <button className="decline-button" onClick={() => handleDeclineClick()} >
          Decline
        </button>
      </div>
    </div>
  );
}

export default InviteCard;