import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

import Customers from './customers/Customers';
import Navbar from './Navbar';
import SignIn from './signin/SignIn';
import AddCustomer from './addcustomer/AddCustomer';
import SingleCustomer from './singlecustomer/SingleCustomer';
import Actions from './singlecustomer/Actions';

// import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useRouteMatch,
  useParams
} from "react-router-dom";


function App() {

  const [customerIdResp, setCustomerIdResp] = useState('');
  const [userServerResp, setUserServerResp] = useState(false);
  // const [actionServerResp, setActionServerResp] = useState('');
  // const [singleCustomer, setSingleCustomer] = useState('');
 
  console.log("customerIdResp w App", customerIdResp);
  console.log("userServerResp w App ", userServerResp);
  // console.log("actionServerResp w App ", actionServerResp);
  // console.log("singleCustomer w App ", singleCustomer);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
            <span className="App-logo-container"> <img src={logo} className="App-logo" alt="logo" />
            <p>C---R---M</p></span>
            { <Navbar userServerResp={userServerResp} setUserServerResp={setUserServerResp}/> }
        </header>
        <Routes>
            <Route path="/" element={<Customers setCustomerIdResp={setCustomerIdResp} />} /> 
            <Route path="signin" element={<SignIn userServerResp={userServerResp} setUserServerResp={setUserServerResp}  />} />
            <Route path="addcustomer" element={<AddCustomer/>} />
            <Route path="singlecustomer/:id" element={<SingleCustomer  /* customerId={customerIdResp} */   />} >
              <Route path="actions" element={<Actions  customerId={customerIdResp} />} />
            </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

