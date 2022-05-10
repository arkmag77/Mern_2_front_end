import React from 'react';

import {
  Link, Navigate, useNavigate
} from "react-router-dom";

import './Navbar.css';
// import axios from 'axios';

function Navbar(props) {

  console.log('props.userServerResp w Navbar', props.userServerResp )

  let navigate = useNavigate();
  

  function logOut(e) {

      e.preventDefault();
      navigate("/signin");
      let userServerRespwNavbar;
      
      props.setUserServerResp (() => {

        return (userServerRespwNavbar ===  false)
        /* return userServerRespwNavbar */

    });



    console.log('userServerRespwNavbar in Logout () in Navbar', userServerRespwNavbar);
    // localStorage.setItem("localStorage.setItem in Logout () in Navbar", null);

  }

  return (
    <div className="Navbar">
      <ul className='TheList'>
        {props.userServerResp && <li><Link to="/" >Customers</Link></li>}
        {!props.userServerResp && <li><Link to="/signin">Sign In Page</Link></li>}
        {/* {!props.userServerResp && <li to="/signin"> Sign In Page</li>} */}
        {props.userServerResp  && <li><Link to="/addcustomer">Add customer</Link></li>}
        {props.userServerResp && <li><Link onClick={logOut} to="/signin">Log out</Link></li>}
      </ul>
    </div>
  );
}

export default Navbar;