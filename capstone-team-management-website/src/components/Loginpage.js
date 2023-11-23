import App, { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Loginpage.css';
import axios from 'axios'; // Import Axios
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NoteContext from '../context/NoteContext';
import { useContext,useEffect } from 'react';

const LoginPage = () => {
  //TODO : fetch specific user from sql and store it in a variable and call the below update func.
  var role =" ";
  var id =" ";
  var hasteam =" ";
 
  const a=useContext(NoteContext);
  
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
 
 console.log(username,password);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        if (data.success) {
          // Update the user state if login is successful
          dispatch({ type: 'User', payload: true });
          // useEffect(username,password);
          console.log("Hwello , ",username);
          //TODO : call from server.js for tyhe id depending on user name
          

          try{
            console.log("inside1");

   const userDataResponse = await axios.get(`http://localhost:5000/api/user/${username}`);
            console.log("inside2");
            console.log(userDataResponse.status)
            if (userDataResponse.status === 200) {
          const userData = userDataResponse.data;
        console.log("username :",username);
        console.log("typeof ",typeof username);

          // Update the user state with user information
          dispatch({
            type: 'User',
            payload: {
              username,
              role: userData.role,
              userid: userData.userid,
              hasteam: userData.hasteam,
            },
          });
          console.log('User ID:', userData.userid);
          console.log('User Role:', userData.role);
          console.log('User Role:', userData.hasteam);
        
        }
          }
          catch(e){

          }

          // Redirect to the home page
          
         navigate('/', { state: { username, password } });
        } else {
          setError('Invalid username or password');
        }
      } else {
        setError('An error occurred while logging in');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred while logging in');
    }
  };

  return (
    <div className="coverp">
      <h2>Login Page </h2>

      <div style={{ height: '20px' }}></div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ height: '20px' }}></div>
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
    </div>

  );
};

export default LoginPage;