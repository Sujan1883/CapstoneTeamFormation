import React, { useState, useEffect } from 'react';
import './Projects.css';
import axios from 'axios';

function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // Fetch project data from the server
    axios.get('http://localhost:5000/api/project')
      .then(response => {
        if (response.data.success) {
          setProjects(response.data.projects);
        } else {
          console.error('Error fetching projects:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  // Filter projects based on the title and search term
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="projects-container">
      <h2>Projects Page</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search projects by title..."
          className="ProjSearchBar"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className='ProjSearch'>Search</button>
      </div>
      {filteredProjects.map((project, index) => (
        <div key={index} className="project-box">
          <h3 className='ProjTitle'>{project.title}</h3>
          <p className="ProjDesc">{project.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default Projects;
