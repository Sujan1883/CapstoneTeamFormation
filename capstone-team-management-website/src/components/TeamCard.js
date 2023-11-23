import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TeamDetailsDialog from './TeamDetailsDialog';
import NoteContext from '../context/NoteContext';
import { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
var leaderId = "";
const TeamCard = ({ teamName, domain, availableSlots, teamLeader, faculty, members }) => {
  const [open, setOpen] = useState(false);
  const a=useContext(NoteContext);

  const [inviteTeams, setInviteTeams] = useState([]);

  const { state, dispatch } = useContext(UserContext);
  dispatch({ type: 'User', payload: true });

  //const [facultyInvites, setFacultyInvites] = useState([]);
  //TODO : seach id from faculty table using faculty name

  const reqJoin = async (e)  => {
    //TODO get leader id from name  fetch from 
    try{

      const userDataResponse = await axios.get(`http://localhost:5000/api/teaminvites/${teamLeader}`);
            if (userDataResponse.status === 200) {
          const userData = userDataResponse.data;
        // console.log("username :",username);
      
          // Update the user state with user information
          dispatch({
            type: 'User',
            payload: {
             facId:userData.student_id
            },
          });
          // console.log('Fac ID:', userData.fac_id);
          // console.log('datas:', userData);
          // console.log('datas:', userData.facultyInvites.fac_id);
          leaderId = userData.student_id;
          console.log("SID: ",leaderId);
        

        axios.post('http://localhost:5000/api/teaminvites', {
          leaderId: leaderId,
          leaderName: teamLeader,
          memberName: a.state.username,
         
          })
        }

          }
          catch(e){
            // console.log("ERROR");
          }
          console.log("SID: ",leaderId);
    console.log("lname "+teamLeader);
    // insert into taminvites table leader id, name ,member id , name 
    console.log("member details name : "+a.state.username); 
  };

  const handleClose = () => {
    setOpen(false);
  };

  const teamDetails = {
    teamName,
    domain,
    teamLeader,
    faculty,
    members: members || [],
  };

  // Create the circular slots
  const slots = Array.from({ length: 4 }, (_, index) => (
    <div
      key={index}
      className={`slot ${index < availableSlots ? 'green' : 'red'}`}
    />
  ));

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {teamName}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Domain: {domain}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Leader Name: {teamLeader}
        </Typography>
        <div className="team-card-content">
          <div className="slots">{slots}</div>
          <Button variant="contained" color="primary" onClick={reqJoin}>
            Request Join
          </Button>
        </div>
      </CardContent>
      <TeamDetailsDialog open={open} handleClose={handleClose} team={teamDetails} />
    </Card>
  );
};

export default TeamCard;
