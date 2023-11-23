// src/components/Home.js
import React, { useEffect } from 'react';
import './Home.css';
import { Footer } from './Footer';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import NoteState from '../context/NoteState';
import NoteContext from '../context/NoteContext';
const Home = () => {
  let c = 0;
  const a=useContext(NoteContext);
  const data = useLocation();
  useEffect(() => {


    // Replace with the actual password
    // console.log("hiii",{data.state.username});x
    //console.log("hipass",data.password);
    
    try{ 
      console.log("NEWNAME UPDATE ",a.state.username);
      //a.update(data.state.username, data.state.password, "", "");
      a.update(data.state.username, data.state.password, "", data.state.role); 
      
      
      
      //TODO fetch from db the particular user
      

    }
    catch(e){
      console.log(e);
    }
 });
  // const { data } = location.state;
  // console.log("Data : ",data);

  //TODO : if role is faculty fetch faculty id fron faculty table using username 
  var uName = a.state.username;
  var Rol="";
  var Id="";
  console.log("UName : "+a.state.username);
  console.log("IID : "+a.state.id);
  console.log("pssWoerd : "+a.state.password);
  console.log("rol : "+a.state.role);
  return (
    <div>
    <div className='home-page' >
      {/* <h2>Home Page</h2> */}

      <div className='subtitle'>

      Team-Up: Where Capstone Success Begins with the Perfect Team 
      </div>
      <div className ='subtitle2'>Team formation made easier, faster, and better.</div>
    </div>
    <Footer/>
    </div>
  );
};

export default Home;
