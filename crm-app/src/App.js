import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

import Customers from './customers/Customers';
import Navbar from './Navbar';
import SignIn from './signin/SignIn';
import AddCustomer from './addcustomer/AddCustomer';
import SingleCustomer from './singlecustomer/SingleCustomer';
import Actions from './singlecustomer/Actions';
import Details from './singlecustomer/Details';

// import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useRouteMatch,
  useParams
} from "react-router-dom";

/* import { render } from "react-dom"; */
/* import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom"; */



function App() {

  const [customerIdResp, setCustomerIdResp] = useState('');

  console.log("customerIdResp w App", customerIdResp)

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
            <span className="App-logo-container"> <img src={logo} className="App-logo" alt="logo" />
            <p>C---R---M</p></span>
            { <Navbar /* serverResponse={serverResponse} setServerResp={setServerResp} *//> }
        </header>
        <Routes>
          {/* <Route> */}
            {/* <Route index element={<Customers />} /> */}
            <Route path="/" element={<Customers setCustomerIdResp={setCustomerIdResp} />} /> 
            <Route path="signin" element={<SignIn  />} />
            <Route path="addcustomer" element={<AddCustomer  />} />
            <Route path="singlecustomer" element={<SingleCustomer customerId={customerIdResp}   />} >
              <Route path="details" element={<Details/>} />
              <Route path="actions" element={<Actions/>} />
            </Route>
            
          {/* </Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

