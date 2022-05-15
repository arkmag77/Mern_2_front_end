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
    console.log("props.serverResponseErr:", props.serverResponseErr);

    const [isPopUpToEditVisible, setPopUpToEditVisible] = useState(false);
    const [customerIdToEdit, setCustomerIdToEdit] = useState('');
    // const [customerNameToEdit, setCustomerNameToEdit] = useState ('');

    const [isPopUpToDeleteVisible, setPopUpToDeleteVisible] = useState(false);
    const [customerIdToDelete, setCustomerIdToDelete] = useState('');


    console.log('props.customerName.value:', props.customerName)
    const [nameMessage, setNameMessage] = useState('');
    const [streetMessage, setStreetMessage] = useState('');
    const [zipcodeMessage, setZipcodeMessage] = useState('');
    const [cityMessage, setCityMessage] = useState('');
    const [nipMessage, setNipMessage] = useState('');


    const validate = (e) => {

        e.preventDefault();
        console.log('function validate (e) in  CustomerList in customers');

        let errNameCounter = 0;
        let errStreetCounter = 0;
        let errZipcodeCounter = 0;
        let errCityCounter = 0;
        let errNipCounter = 0;
        let errServerCounter = 0;

        if (props.customerName.trim() === '') {

            errNameCounter++;

            setNameMessage('⚠ Customer name is required');

        } else if (props.customerName.trim().length < 5) {

            errNameCounter++;

            setNameMessage('⚠ Customer name is too short, at least 5 characters are required');

        } else {

            errNameCounter = 0;

            setNameMessage('');
        }

        if (props.customerStreet.trim() === '') {

            errStreetCounter++;

            setStreetMessage('⚠ Street is required');

        } else if (props.customerStreet.trim().length < 4) {

            errStreetCounter++;

            setStreetMessage('⚠ Street is too short, at least 4 characters are required');

        } else {

            errStreetCounter = 0;

            setStreetMessage('');
        }

        if (props.customerZipcode.trim() === '') {

            errZipcodeCounter++;

            setZipcodeMessage('⚠ Zipcode is required');

        } else if (props.customerZipcode.trim().length != 6 /* || props.customerZipcode.trim().length != 7 */) {

            errZipcodeCounter++;

            setZipcodeMessage('⚠ Exactly 6 or 7 characters are required');

        } else {

            errZipcodeCounter = 0;

            setZipcodeMessage('');
        }

        if (props.customerCity.trim() === '') {

            errCityCounter++;

            setCityMessage('⚠ City is required');

        } else if (props.customerCity.trim().length < 5) {

            errCityCounter++;

            setCityMessage('⚠ City is too short, at least 4 characters are required');

        } else {

            errCityCounter = 0;

            setCityMessage('');
        }

        if (props.customerNip.trim() === '') {

            errNipCounter++;

            setNipMessage('⚠ Nip is required');

        } else if (props.customerNip.trim().length != 10) {

            errNipCounter++;

            setNipMessage('⚠ Exactly 10 digits are allowed');

        } else if (isNaN(props.customerNip.trim())) {

            errNipCounter++;

            setNipMessage('⚠ Only digits are allowed');

        } else {

            errNipCounter = 0;

            setNipMessage('');
        }

        /* if (props.serverResponseErr === 'Error: Request failed with status code 404') {

            errServerCounter++;
            alert('Error: Request failed with status code 404')

        } else if (props.serverResponseErr === '') {

            errServerCounter = 0;

        }
         */

        if (errNameCounter === 0 && errStreetCounter === 0 && errZipcodeCounter === 0 && errCityCounter === 0 && errNipCounter === 0) {
            props.editCustomer(customerIdToEdit);
            setPopUpToEditVisible(false);

        }

    }



    let trElements = customersList.map((customer, index) => {
        console.log("Customer id", customer._id);
        return (
            <tr key={customer._id}  >
                <td className="ID">{index + 1}</td>
                <td className="CustomerName"> {customer.name}</td>
                <td className="Adres">{customer.address.street} {<br />} {customer.address.zipcode} {customer.address.city}</td>
                <td className="Nip">{customer.nip}</td>
                <td className="Details" onClick={() => { console.log("Details clicked"); props.detailsMethod(customer._id) }}><Link to={`/singlecustomer/${customer._id}`} > Details </Link> </td>
                <td className="Edit" ><button onClick={() => {
                    console.log("Edit Customer btn clicked"); setCustomerIdToEdit(customer._id);
                    props.setCustomerName(customer.name); props.setCustomerStreet(customer.address.street); props.setCustomerZipcode(customer.address.zipcode);
                    props.setCustomerCity(customer.address.city); props.setCustomerNip(customer.nip);
                    setPopUpToEditVisible(true)
                }}> Edit Customer </button> </td>
                <td className="Delete" ><button onClick={() => { console.log("Delete Customer btn clicked"); setCustomerIdToDelete(customer._id); setPopUpToDeleteVisible(true) }}> Delete Customer </button> </td>
            </tr>
        );
    })

    return (

        <div className="CustomersList" >

            {(isPopUpToEditVisible) &&
            <div className="PopUpWindow" >

                <h1>Edit Customer Form</h1>
                <form className="PopUpWindowForm" onSubmit={(e) => { console.log("Save btn clicked, customer._id:", customerIdToEdit); validate(e)/* props.editCustomer(e, customerIdToEdit);   setPopUpToEditVisible(false) */ }}>

                    <fieldset>
                        <label htmlFor="Name">Name and Surname</label> 
                        <input /* ref={inputName} */ value={props.customerName} onChange={(e) => props.setCustomerName(e.target.value)} name="Name" type="text" /* placeholder={props.customerNameToEdit} */ /* value={props.target.value}  */  /*onChange={(e)=>props.setCustomerName(e.target.value)} /* value={customerNameToEdit} */ /><br />
                        <span className='NameMessage'>{nameMessage}</span> 
                    </fieldset>

                    <fieldset >
                         <label htmlFor="Stree">Street</label> 
                        <input /* ref={props.inputStreet} */ value={props.customerStreet} onChange={(e) => props.setCustomerStreet(e.target.value)} name="Street" type="text" placeholder="Enter Street" /> <br />
                        <span className='streetMessage'>{streetMessage}</span> <br />

                        <label htmlFor="Zipcode">Zipcode</label> 
                        <input /* ref={props.inputZipcode} */ value={props.customerZipcode} onChange={(e) => props.setCustomerZipcode(e.target.value)} name="Zipcode" type="text" placeholder="Enter Zipcode" /> <br />
                        <span className='ZipcodeMessage'>{zipcodeMessage}</span> <br />

                        <label htmlFor="City">City</label> 
                        <input /* ref={props.inputCity} */ value={props.customerCity} onChange={(e) => props.setCustomerCity(e.target.value)} name="City" type="text" placeholder="Enter City" /> <br />
                        <span className='CityMessage'>{cityMessage}</span> 
                    </fieldset>

                    <fieldset>
                        <label htmlFor="Nip">NIP Number</label> 
                        <input /* ref={props.inputNip} */ value={props.customerNip} onChange={(e) => props.setCustomerNip(e.target.value)} name="Nip" type="text" placeholder="Enter NIP Number" />
                        <span className='nipMessage'>{nipMessage}</span> 
                    </fieldset>

                    <fieldset className="Buttons">
                        <button type="Submit" className="btnSave" /* onClick={()=>{console.log("Save btn clicked, customer._id:", customerIdToEdit); props.editCustomer(customerIdToEdit); setPopUpToEditVisible(false) }} */> Save </button>
                        <button className="btnNo" onClick={() => { console.log("No btn clicked"); setPopUpToEditVisible(false) }}> Do not save </button>
                    </fieldset>    

                    <fieldset>
                            <span className="ServerRespComment"> {/* {props.serverResponseErr}  */}</span>
                    </fieldset>

                </form>

            </div>}

            {isPopUpToDeleteVisible && <div className="PopUpWindow" >
                <p>Do You want to delete Customer?</p>
                <button className="btnYes" onClick={() => { console.log("Yes btn clicked, customer._id:", customerIdToDelete); props.removeCustomer(customerIdToDelete); setPopUpToDeleteVisible(false) }}> Yes </button>
                <button className="btnNo" onClick={() => { console.log("No btn clicked"); setPopUpToDeleteVisible(false) }}> No </button>
            </div>}

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
