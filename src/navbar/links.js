import React from 'react';



export const Links = (props) =>
{
  const changePage = (page) =>
  {
    document.querySelector('.navbar-dropdown-links').classList.remove('display-links');
    props.setState( {type: page})

  }


  return (
    <ul className={`${props.classType}`}>
      <li><button className="navbar-btn" onClick={() => changePage('workout')}>Workout Log</button></li>
      <li><button className="navbar-btn" onClick={() => changePage('products')}>Products</button></li>
      <li><button className="navbar-btn" onClick={() => props.setState()}>About</button></li>
    </ul>
  );
}