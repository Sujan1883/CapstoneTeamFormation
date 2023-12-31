import React from 'react';
import './Profile.css';
import defaultPhoto from '../images/mypic.png';
import NoteContext from '../context/NoteContext';
import {useContext} from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../App';

const About = () => {
  const a=useContext(NoteContext);
  var lName = a .state.username;
  const { state, dispatch } = useContext(UserContext);
  dispatch({ type: 'User', payload: true });

  const [userFetch, setUserFetch] = useState([]);
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      // Use the faculty name from the context to make the API request
      const response = await axios.get(`http://localhost:5000/api/fetchprofile/${lName}`);
      if (response.data.success) {
        setUserFetch(response.data.userFetch);
      } else {
        console.error('Error fetching user det:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user dets:', error);
    }
  };
  fetchProfile();
}, [lName]); // Include facultyState.fullname as a dependency
console.log("User Det" ,userFetch);

  function displayImage(input) {
    const profileImage = document.getElementById('profile-image');
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileImage.src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
 
  // Function to trigger the file input click event
  function openFileInput() {
    const fileInput = document.getElementById('photo-upload');
    fileInput.click();
  }
 
  // Set the default image source
  return (
    <div className='coverr'>
    <div className="profile-container">
      <div className="profile-photo">
        <label htmlFor="photo-upload" className="photo-label">
          <div className="profile-image">
            <img
              src={defaultPhoto} // Use the default image source
              alt="Profile Image"
              id="profile-image"
              width="150" // Adjust the width as needed
              height="150" // Adjust the height as needed
            />
          </div>
          <div className="edit-icon">
            <i className="fas fa-pencil-alt"></i>
          </div>
        </label>
        <input
          type="file"
          id="photo-upload"
          accept="image/*"
          onChange={(e) => displayImage(e.target)}
          style={{ display: 'none' }}
        />
        <button
          className="edit-photo-button"
          onClick={openFileInput}
        >
          Edit Photo
        </button>
      </div>
      <hr className="separator" />
      <div className="profile-details">
      {userFetch.map((user) => (
            <>
              <p className='Name'><strong>Name : </strong>{user.username}</p>
              <p className='Email'><strong>Email: </strong>{user.email}</p>
              <p className='MNo'><strong>Mobile No:</strong>{user.mobileNo}</p>
              <p className='Role'><strong>Role:</strong>{user.role}</p>
              <p className='Userid'><strong>User ID:</strong>{user.userid}</p>
              {/* Include other user details */}
            </>
          ))}
      </div>
    </div>
    </div>
  );
};

export default About;