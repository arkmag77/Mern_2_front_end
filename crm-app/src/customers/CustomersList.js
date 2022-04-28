import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Link, 
    useNavigate,
    Outlet,
  } from "react-router-dom";
import './CustomersList.css';

function CustomersList(props) {

    let customersList = props.customersList;
    
    console.log("customersList w CustomersList ", customersList);
    let counter = 1;

    let trElements = customersList.map((customer) =>  { 
        console.log("Customer id", customer._id);
        return (
            <tr  key={customer._id}  >
                <td className="ID">{counter++}</td>
                <td className="CustomerName"> {customer.name}</td>
                <td className="Adres">{customer.address.street} {<br/>} {customer.address.zipcode} {customer.address.city}</td>
                <td className="Nip">{customer.nip}</td>
                <td className="Details" onClick={()=> {console.log("Szczegółowe Dane clicked"); props.detailsMethod(customer._id)}}><Link to="/singlecustomer" > Szczegółowe dane</Link> </td> 
            </tr>
        );
    }) 

    return (

        <div>

            <div className="CustomersList">
                <table className="List">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Imie i Nazwisko</td>
                            <td>Adres</td>
                            <td>NIP</td>
                            <td>Inne informacje</td>
                        </tr>
                    </thead>
                    <tbody>
                        {trElements}
                    </tbody> 
                </table>
            </div>
            {/* <Outlet/> */}

        </div>

        

    );


}

export default CustomersList;
