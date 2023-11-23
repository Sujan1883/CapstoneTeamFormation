import React, { useContext } from 'react';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './Registerpage.css';

const RegisterPage = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      let requestData = {
        fullname,
        mobileNo,
        email,
        role: selectedRole,
        username,
        password,
      };

      if (selectedRole === 'faculty') {
        requestData = {
          ...requestData,
          domain,
        };
      }

      const response = await axios.post('http://localhost:5000/api/register', requestData);

      if (response.status === 200) {
        const data = response.data;
        if (data.success) {
          // Registration successful, redirect to the login page
          navigate('/login');
        } else {
          setError('Registration failed. Please try again.');
          console.error('Registration failed:', data.message);
        }
      } else {
        setError('An error occurred during registration.');
        console.error('Error during registration:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred during registration.');
    }



    
          
          
  };

  return (
    <div className="cover">
      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
        <input type="text" placeholder="Fullname" required onChange={(e) => setFullname(e.target.value)} />
        <br />
        <br />
        <input type="text" placeholder="Mobile Number" required onChange={(e) => setMobileNo(e.target.value)} />
        <br />
        <br />
        <input type="email" placeholder="Email" name="email" required onChange={(e) => setEmail(e.target.value)} />
        <br />
        <br />
        <select className="dropdown" id="role" value={selectedRole} onChange={handleRoleChange}>
          <option value="" disabled>
            Role
          </option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
        <br />
        <br />
        {selectedRole === 'faculty' && (
          <>
            <input type="text" placeholder="Domain" required onChange={(e) => setDomain(e.target.value)} />
            <br />
            <br />
          </>
        )}
        <input type="text" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} />
        <br />
        <br />
        <input type="password" placeholder="Password" name="password" required onChange={(e) => setPassword(e.target.value)} />
        <br />
        <br />
        <button className="register-btn" type="submit">
          Register
        </button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default RegisterPage;
