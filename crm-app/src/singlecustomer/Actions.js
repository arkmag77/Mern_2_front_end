import React, { useState, useEffect, useRef } from 'react';

import {
    Link, 
    useNavigate,
    useParams,
    Outlet,
  } from "react-router-dom";
import './SingleCustomer.css';

import axios from 'axios';

function Actions (props) {


    // let id = props.customerId;
    let { id } = useParams();
    // let x = false;
    let navigate = useNavigate();
    

    const inputDate = React.useRef();
    const inputActionDescrition = React.useRef();
    const selectActionType = React.useRef();

    const add = (e) => {

        e.preventDefault();
        
        console.log('przekazane id  do add () w Actions ', id)
        

        let newAction = {
            date: inputDate.current.value,
            action_type: selectActionType.current.value,
            action_description: inputActionDescrition.current.value
        };

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        axios.put('http://www.localhost:8080/api/customer/'+id+'/createAction', 
        JSON.stringify(newAction ),
            { 'headers': headers })
            .then((res) => {
                navigate('/singlecustomer/'+id);
                console.log("res.data add () w Actions ", res.data);

            })

        
            

            .catch((error) => {
                console.error(error);
            })
       

    }

    return (
        
            <div className="Action">
            
            <h3>Add Action Form</h3>

            <form onSubmit={(e)=>{add(e);  console.log('btn Save Action clicked') }}> 

                <fieldset>
                    <label htmlFor = "Date" >Date</label> <br />
                    <input ref={inputDate} name="Date" type="date" placeholder="Enter Date" />
                </fieldset>
                
                <fieldset>
                    <label htmlFor = "ActionDescription">Action Description</label> <br />
                    <textarea ref={inputActionDescrition} name="ActionDescrition" rows="5" cols="66" placeholder="Enter Action Description" /> <br />
                </fieldset>

                <fieldset>
                    <label htmlFor="ActionType">Action Type</label> <br />
                    <select ref={selectActionType} name="ActionType" id="ActionType-select">
                        <option value="">--Please choose an action type--</option>
                        <option value="Phone">Phone</option>
                        <option value="Meeting">Meeting</option>    
                        <option value="Other">Other</option>    
                    </select>
                </fieldset>

                <button type="submit" >Save Action</button>

                <fieldset>
                    <span className="ServerRespComment"> {/* {serverResponseErr} */} </span>
                </fieldset>

            </form>
            

             </div>
    

    );
}

export default Actions;