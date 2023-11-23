// src/App.js
import React, { createContext, useReducer , useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Faculty from './components/Faculty';
import TeamInfo from './components/TeamInfo';
import { AuthProvider } from './context/AuthContext'; 
import LoginPage from './components/Loginpage';
//import LogoutPage from './components/Logoutpage';
import { initialState,reducer } from './reducer/UseReducer';
import RegisterPage from './components/Registerpage';
import './App.css'
import InviteCard from './components/InviteCard';
//import { Invites } from './components/Invites';
import TeamList from './components/TeamList';
import TeamUtils from './components/TeamUtils';
import NoteState from './context/NoteState';
import { Invites } from './components/Invites';
import FacultyProfile from './components/FacultyProfile';
import FacultyTeams from './components/FacultyTeams';
import FacultyInvites from './components/FacultyInvites';
import Publications from './components/Publications';
import TeamForm from './components/TeamForm';
import TeamState from './context/TeamState';
import FacultyState from './context/FacultyState';

export const UserContext=createContext();

// Custom hook to redirect to the home page on refresh
export function useRefreshRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleRefresh = (e) => {
      if (e.persisted) {
        // If the refresh was initiated by the user (e.g., pressing F5), navigate to the home page
        navigate('/');
      }
    };

    window.addEventListener('beforeunload', handleRefresh);

    return () => {
      window.removeEventListener('beforeunload', handleRefresh);
    };
  }, [navigate]);

  useEffect(() => {
    if (location.pathname === '/') {
      // If the current route is already the home page, navigate to it to trigger the effect
      navigate('/');
    }
  }, [location.pathname, navigate]);

  return null;
}

const App = () => {
  const[state,dispatch]=useReducer(reducer,initialState);


  return (

    <UserContext.Provider value={{state,dispatch}}>
      <NoteState>
      <FacultyState>
      <TeamState>
    <AuthProvider>
      <Router >
        <div className ="app-cover">
          <Navbar />
          <useRefreshRedirect />
          <Routes>
          <Route path="/" element={<Home />}></Route> 
           <Route path="/login" element={<LoginPage />} /> 
            <Route path="/register" element={<RegisterPage />} />
            {/*<Route index element={<Home />} />*/}
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/invites" element={<Invites />} />
            <Route path="/facultyinvites" element={<FacultyInvites />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/facultyprofile" element={<Profile />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/teaminfo" element={<TeamUtils />} />
            <Route path="/facultyteams" element={<FacultyTeams />} />
            <Route path="/teamlist" element={<TeamList />} />
            <Route path="/createteam" element={<TeamForm />} /> {/*Added*/}
            {/*<Route path="/logout" element={<LogoutPage />} />*/}
          </Routes>
         
        </div>
      </Router>
    </AuthProvider>
    </TeamState>
    </FacultyState>
    </NoteState>
    </UserContext.Provider>
  );
};

export default App;
