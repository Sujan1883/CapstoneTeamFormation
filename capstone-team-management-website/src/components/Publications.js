import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import './Publication.css'; // Import the CSS file for styling
import axios from 'axios'; // Import Axios
import { UserContext } from '../App';

function Publications() {
  const [publications, setPublications] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  // Use the user's role from the context
  const role = state ? state.role : null;
  console.log("ROLE : ",role ); 
  useEffect(() => {
    // Fetch publications data from your Express server
    axios.get('http://localhost:5000/api/publications')
    .then(response => {
      if (response.data.success) {
        setPublications(response.data.publications);
      } else {
        console.error('Error fetching publications:', response.data.message);
      }
    })
    .catch(error => {
      console.error('Error fetching publications:', error);
    });
  }, []);
  // Sample paper data (you can replace this with your actual data)
  // const papers = [
  //   {
  //       paperName: "Paper 1",
  //       conference : "IIT",
  //       Domain : "AI",
  //       link:"https://www.example.com",
  //   },
  //   {
  //       paperName: "Paper 1",
  //       conference : "IIT",
  //       Domain : "AI",
  //       link:"http",
  //   },{
  //       paperName: "Paper 1",
  //       conference : "IIT",
  //       Domain : "AI",
  //       link:"http",
  //   },{
  //       paperName: "Paper 1",
  //       conference : "IIT",
  //       Domain : "AI",
  //       link:"http",
  //   }
  // ];
  console.log(publications);
  return (
    <div className="publication-container">
      {publications.map((publication, index) => (
        <div key={index} className="publication-box">
          <h3 className='PaperName'>{publication.conference}</h3>
          <p className='paperDesc'><strong>year : </strong>{publication.year}</p>
          <p className='paperDesc'><strong>domain : </strong>{publication.domain}</p>
          <p className='paperDesc'><a href={publication.link} target="_blank">Click to Read the Paper</a></p>
        </div>
      ))}
    </div>
  );
}

export default Publications;
