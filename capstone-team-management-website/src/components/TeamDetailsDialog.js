import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const TeamDetailsDialog = ({ open, handleClose, team }) => {
  if (!team) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogContent sx={{ padding: '20px' }}>
        <Typography variant="h5">{team.teamName}</Typography>
        <Typography>Team Leader: {team.teamLeader}</Typography>
        <Typography>Domain: {team.domain}</Typography>
        <Typography>Faculty Associated: {team.faculty}</Typography>
        <Typography>Members: {team.members.join(', ')}</Typography>
        <Button variant="contained" color="primary">
          Request to Join
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TeamDetailsDialog;
