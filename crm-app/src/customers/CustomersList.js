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

    const [isPopUpToEditVisible, setPopUpToEditVisible] = useState(false);
    const [customerIdToEdit, setCustomerIdToEdit] = useState ('');
    
    const [isPopUpToDeleteVisible, setPopUpToDeleteVisible] = useState(false);
    const [customerIdToDelete, setCustomerIdToDelete] = useState ('');

    

    let trElements = customersList.map((customer, index) =>  { 
        console.log("Customer id", customer._id);
        return (
            <tr  key={customer._id}  >
                <td className="ID">{index + 1}</td>
                <td className="CustomerName"> {customer.name}</td>
                <td className="Adres">{customer.address.street} {<br/>} {customer.address.zipcode} {customer.address.city}</td>
                <td className="Nip">{customer.nip}</td>
                <td className="Details" onClick={()=> {console.log("Details clicked"); props.detailsMethod(customer._id)}}><Link to={`/singlecustomer/${customer._id}`} > Details </Link> </td>
                <td className="Edit" ><button onClick={()=> {console.log("Edit Customer btn clicked"); setCustomerIdToEdit(customer._id); setPopUpToEditVisible(true)}}> Edit Customer </button> </td>  
                <td className="Delete" ><button onClick={()=> {console.log("Delete Customer btn clicked"); setCustomerIdToDelete(customer._id); setPopUpToDeleteVisible(true)}}> Delete Customer </button> </td>  
            </tr>
        );
    }) 

    return (

        <div>
            
            {isPopUpToEditVisible && 
            <div className="PopUpWindow" >
                    
                <h3>Edit Customer Form</h3>
                <form onSubmit = {(e)=>{console.log("Save btn clicked, customer._id:", customerIdToEdit); props.editCustomer(e, customerIdToEdit); setPopUpToEditVisible(false) }}>

                    <fieldset>
                        <label htmlFor="Name">Name and Surname</label> <br />
                        <input ref={props.inputName} name="Name" type="text" placeholder="Enter Name and Surname" />
                    </fieldset>

                    <fieldset >
                        <label htmlFor="Stree">Street</label> <br />
                        <input ref={props.inputStreet} name="Street" type="text" placeholder="Enter Street" /> <br />

                        <label htmlFor="Zipcode">Zipcode</label> <br />
                        <input ref={props.inputZipcode} name="Zipcode" type="text" placeholder="Enter Zipcode" /> <br />

                        <label htmlFor="City">City</label> <br />
                        <input ref={props.inputCity} name="City" type="text" placeholder="Enter City" />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="Nip">NIP Number</label> <br />
                        <input ref={props.inputNip} name="Nip" type="text" placeholder="Enter NIP Number" />
                    </fieldset>

                <button type="Submit" className="btnSave" /* onClick={()=>{console.log("Save btn clicked, customer._id:", customerIdToEdit); props.editCustomer(customerIdToEdit); setPopUpToEditVisible(false) }} */> Save </button>
                <button className="btnNo" onClick={()=>{console.log("No btn clicked"); setPopUpToEditVisible(false)}}> Do not save </button>

                <fieldset>
                    <span className="ServerRespComment"> {/* {serverResponseErr} */} </span>
                </fieldset>

            </form>
                    
            </div> } 
            
            {isPopUpToDeleteVisible && <div className="PopUpWindow" >
                    <p>Do You want to delete Customer?</p>
                    <button className="btnYes" onClick={()=>{console.log("Yes btn clicked, customer._id:", customerIdToDelete); props.removeCustomer(customerIdToDelete); setPopUpToDeleteVisible(false) }}> Yes </button>
                    <button className="btnNo" onClick={()=>{console.log("No btn clicked"); setPopUpToDeleteVisible(false)}}> No </button>
            </div> } 

            <div className="CustomersList">
                <table className="List">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Name and Surname</td>
                            <td>Address</td>
                            <td>NIP</td>
                            <td>Details</td>
                            <td>Edit Customer</td>
                            <td>Delete Customer</td>
                        </tr>
                    </thead>
                    <tbody>
                        {trElements}
                    </tbody> 
                </table>
            </div>
        </div>
    );


}

export default CustomersList;
