import React, {useState} from 'react';
import {Links} from './links.js';
import {FaBars} from 'react-icons/fa';


export function Navbar(props)
{

  const displayLinks = () => 
  {
    const dropDownLinks = document.querySelector('.navbar-dropdown-links').classList.toggle('display-links');
  }


  return (
    <nav className="navbar">
  
      <div className="navbar-center">
        <div className="navbar-logo-div">
          <p>Workout</p>
          <p>Log</p>
        </div>

        <Links setState={props.setState} classType={'navbar-links'}/>
        <button className="navbar-toggle-btn" onClick={displayLinks}><FaBars/></button>
      </div>

      <div className="navbar-links-container">
        <Links setState={props.setState} classType={'navbar-dropdown-links'} />
      </div>
      
    </nav >
  )
}