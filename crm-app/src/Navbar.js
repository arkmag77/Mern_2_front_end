import React from 'react';

import {
  Link, useNavigate
} from "react-router-dom";

import './Navbar.css';
// import axios from 'axios';

function Navbar(/* props */) {

//   let navigate = useNavigate();

//   function logOut(e) {

//     e.preventDefault();

//     let logedUser = {
//       username: props.serverResponse.username,
//       jwtToken: props.serverResponse.jwt_token
//     }

//     console.log(`Wylogowanie ${logedUser.jwtToken}`);
//     console.log(`Wylogowanie ${logedUser.username}`);

//     const headers = {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//       'Authorization': 'Bearer '  + logedUser.jwtToken
//     };

//     axios.post(
//       'https://akademia108.pl/api/social-app/user/logout',
//       {},
//       { 'headers': headers })
//       .then((res) => {

//         console.log("Odpowiedź z wylogowywania servera", res);

//         if (res.data.message === "Successfully logged out") {

//           localStorage.setItem("serverResponse", null);
          
//           props.setServerResp(() => {

//             let serverResp = null;
//             console.log("Odpowiedź z wylogowywania servera", res.data.message);
//             return serverResp;

//           });
//           // navigate("/signin");
          
//           navigate("/signin");
//         }

//         if (res.data.message === "Unauthenticated.") {

//           console.log("Odpowiedź z wylogowywania servera", res.data.message);

//         }

//       })

//       .catch((error) => {
//         console.error(`Błąd ${error}`);
//       })

//   }

  return (
    <div className="Navbar">
      <ul className='TheList'>
        <li><Link to="/">Customers</Link></li>
        {/* !props.serverResponse && */ <li><Link to="/signin">Sign in</Link></li>}
        {/* {!props.serverResponse && <li><Link to="/singlecustomer">Single customer</Link></li>} */}
        {/* props.serverResponse &&  */<li><Link to="/addaction">Add action</Link></li>}
        {/* props.serverResponse &&  */<li><Link to="/addcustomer">Add customer</Link></li>}
        {/* { props.serverResponse &&  <li><Link onClick={logOut} to="/signin">Log out</Link></li>} */}
      </ul>
    </div>
  );
}

export default Navbar;