import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

import Customers from './customers/Customers';
import Navbar from './Navbar';
import SignIn from './signin/SignIn';
import AddCustomer from './addcustomer/AddCustomer';
import SingleCustomer from './singlecustomer/SingleCustomer';
import Actions from './singlecustomer/Actions';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
  // useNavigate
} from "react-router-dom";


function App() {

  const [customerIdResp, setCustomerIdResp] = useState('');
  const [userServerResp, setUserServerResp] = useState(false);
 
  console.log("customerIdResp w App", customerIdResp);
  console.log("userServerResp w App ", userServerResp);

  // let navigate = useNavigate();

if (!userServerResp) {
  {<Navigate to = "/signin"/> }
}


  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
            <span className="App-logo-container"> <img src={logo} className="App-logo" alt="logo" />
            <p>C---R---M</p></span>
            { <Navbar userServerResp={userServerResp} setUserServerResp={setUserServerResp}/> }
        </header>
        <Routes>
              <Route path="/" element={<Customers setCustomerIdResp={setCustomerIdResp} userServerResp={userServerResp} />} /> 
              <Route path="signin" element={<SignIn userServerResp={userServerResp} setUserServerResp={setUserServerResp}  />} />
              <Route path="addcustomer" element={<AddCustomer/>} />
              <Route path="singlecustomer/:id" element={<SingleCustomer  /* customerId={customerIdResp} */   />} />
              <Route path="action/:id"  element={<Actions  customerId={customerIdResp} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

