import TeamContext from "../context/TeamContext";
import React, {useContext,useState } from 'react';
import './TeamForm.css';
import axios from 'axios';
import { UserContext } from '../App';
var teamID = "",lName="";
var mem=[];
const TeamForm = () => {

  const [formData, setFormData] = useState({
    leadername: '',
    teamName: '',
    domain: '',
    members: [],
    newMemberName: '', // New member name input field value
  });

  const a=useContext(TeamContext);
  
  const { state, dispatch } = useContext(UserContext);


  const [isAddingMember, setIsAddingMember] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddMember = () => {
    if (formData.members.length < 2) {
      setFormData({
        ...formData,
        members: [...formData.members, formData.newMemberName],
        newMemberName: '', // Clear the new member name input
      });
      setIsAddingMember(true); // Set the flag to indicate Add Member mode
    }
  };
  const copyMembers=[];
  const handleMemberInputChange = (e, index) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index] = e.target.value;
    setFormData({
      ...formData,
      members: updatedMembers,
    });
    copyMembers=updatedMembers;
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/createteam', formData);
      
      if (response.status === 200) {
        console.log('Team created successfully:', response.data);
        // Navigate()
        // Optionally, you can redirect to the team list page or perform other actions
      } else {
        console.error('Error creating team:', response.data.message);
      }
    } catch (error) {
      console.error('Error creating team:', error);
    }


    //added 
  try{
    console.log("team anme : ",formData.teamName);
    const userDataResponse = await axios.get(`http://localhost:5000/api/fetchTeamInfo/${formData.teamName}`);
    console.log("team anme2 : ",formData.teamName);

            console.log(formData.teamName);
            console.log(userDataResponse.status)
            if (userDataResponse.status === 200) {
          const userData = userDataResponse.data;
        console.log("teamname :",formData.teamName);
        console.log("typeof ",typeof formData.teamName);
          // teamname = formData.teamName
          // Update the user state with user information
          dispatch({
            type: 'Team',
            payload: {
              leadername:userData.leadername,
              teamid: userData.id,
              members: userData.members,
              
            },
          });
          lName = userData.leadername;
          console.log('User ID:', userData.teamid);
          console.log('User ID:', userData.teamid);
          console.log('User ID:', userData.teamid);
          console.log('User ID:', userData.teamid);
          console.log('User ID:', userData.teamid);
          console.log('User ID:', userData.teamid);
          console.log('User ID:', userData.teamid);
          // console.log('User Role:', userData.members);
          teamID = userData.teamid;
          a.update(formData.teamName, formData.leadername, "",userData.teamid);
        
        }


        var lName = formData.leadername;
        var mem = formData.members;
        var s=lName+","+ formData.members.join(',') + ',' + formData.newMemberName;
        console.log("update me : "+s);

        // var list=[];
        const list = s.split(',');
        // const list = mem;
        console.log(list);
        // try{
        for (let i = 0; i < list.length; i++) {
          console.log("LOOP : ",list[i]);
          if(list[i]==""){
            console.log("NULL");
            continue;
          }
          try{
          const updateHasteamResponse = await axios.put(`http://localhost:5000/api/updateHasteam/${list[i]}`);
          }
          catch{
            console.log("ERRRRRRRRRR");
          }
          console.log("teamID , ",teamID);
          console.log("teamID , ",teamID);
          console.log("teamID , ",teamID);
          console.log("teamID , ",teamID);
          console.log("teamID , ",teamID);

          if(teamID!=""){
            console.log("INteam : ",teamID,);
            const insertTeamInfo = await axios.post(`http://localhost:5000/api/teamInfo/${list[i]}/${teamID}`);
            
          }
          
        }
      // }
      // catch(e){
      //   console.log("error2"+e);

      // }
        //TODO update the user hasteam to 1 by username 
        const updateHasteamResponse = await axios.put(`http://localhost:5000/api/updateHasteam/${formData.leadername}`);
      }
      catch{
        console.log("error");
      }
  };
  return (
    <div className="center-container">
      <form onSubmit={handleSubmit}>
        <div className="form-box">
          <div className="username">
            <label>Team Leader: </label>
            <input
              type="text"
              name="leadername"
              value={formData.leadername}
              onChange={handleInputChange}
            />
          </div>

          <div className="teamname">
            <label>Team Name: </label>
            <input
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={handleInputChange}
            />
          </div>

          <div className="domain">
            <label>Domain: </label>
            <input
              type="text"
              name="domain"
              value={formData.domain}
              onChange={handleInputChange}
            />
          </div>

          <div className="members">
            <label>Members: </label>
            {formData.members.map((member, index) => (
              <div
                key={index}
                className={`member-input ${isAddingMember ? 'narrow-member-input' : ''}`}
              >
                <input
                  type="text"
                  name={`members[${index}]`}
                  value={member}
                  onChange={(e) => handleMemberInputChange(e, index)}
                />
              </div>
            ))}
            {formData.members.length < 3 && (
              <div className="member-input">
                <input
                  type="text"
                  name="newMemberName"
                  value={formData.newMemberName}
                  onChange={handleInputChange}
                />
              </div>
            )}
            {formData.members.length < 2 && (
              <button type="button" className="AddMember" onClick={handleAddMember}>
                Add Member
              </button>
            )}
          </div>

          <div className="submitbutton">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TeamForm;
