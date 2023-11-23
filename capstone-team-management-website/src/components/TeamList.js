import React, { useState, useEffect } from 'react';
import TeamCard from './TeamCard';
import './TeamList.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
import axios from 'axios';


const TeamList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/team')
      .then(response => {
        if (response.data.success) {
          setTeams(response.data.teams);
        } else {
          console.error('Error fetching teams:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  }, []);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter teams based on the search term
  const filteredTeams = teams.filter(team =>
    team.teamname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="header">
        <div className="search-bar">
          <input
            type="text"
            className='SearchText'
            placeholder="Search For Team"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button type="button" className='SearchButton'>Search</button>
        </div>
        <Link to="/createteam" className="create-team-button">Create Team</Link>
      </div>

      <div className="team-cards-container">
        {filteredTeams.map((team, index) => (
          <TeamCard
            key={index}
            teamName={team.teamname}
            domain={team.domain}
            teamLeader={team.leadername}
            availableSlots={team.noofslots}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamList;
