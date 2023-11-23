import React from 'react';
import './Profile.css';
import defaultPhoto from '../images/MyPhtoto.jpeg';

const FacultyProfile = () => {
  // Function to display the selected image
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
        <p className='Name'><strong>Name : </strong> Sumi</p>
        <p className='Name'><strong>Username : </strong> Sujan_x.Sumi.x</p>
        <p className='Email'><strong>Email: </strong>sujan@example.com</p>
        <p className='Age'><strong>Age:</strong> 32</p>
        <p className='Domain'><strong>Domain:</strong> Wifey</p>
        <p className='Domain'><strong>Experience:</strong> 5</p>
        <p className='MNo'><strong>Mobile No:</strong> 99923876189</p>
      </div>
    </div>
    </div>
  );
};

export default FacultyProfile;
