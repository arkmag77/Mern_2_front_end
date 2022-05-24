import React, { useState, useEffect, useRef } from 'react';
// import * as moment from 'moment';
import './Actions.css';

import {
    Link, 
    useNavigate,
    useParams,
    Outlet,
  } from "react-router-dom";
// import './SingleCustomer.css';

import axios from 'axios';

function Actions (props) {


    // let id = props.customerId;
    let { id } = useParams();
    let navigate = useNavigate();
    let errcounter = 0;
    
    const [dateMessage, setDateMessage] =  useState('');
    const [actionDescriptionMessage, setActionDescriptionMessage] =  useState();
    const [actionTypeMessage, setActionTypeMessage] =  useState();
    const [serverResponseErr, setServerResponseErr] = useState();

    const inputDate = React.useRef();
    const inputActionDescrition = React.useRef();
    const selectActionType = React.useRef();

    const validate = (e) => {

        e.preventDefault();
        let errCounterDate = 0;
        let errCounterActionDesc = 0;
        let errCounterActionType = 0;
        let nowDate = new Date();
        let _inputDate = new Date(inputDate.current.value); 
        
        let time = _inputDate.getDate() - nowDate.getDate();

        

        if (inputDate.current.value === ''){

            setDateMessage ('⚠ Date is required');
            errCounterDate  ++;

        } else if(time > 0) {

            setDateMessage ('⚠ Selected Date is not valid');
            errCounterDate  ++
            console.log('⚠ Selected Date is not valid', time);

        } else {

            setDateMessage ('');
            errCounterDate   = 0
        }

        if (inputActionDescrition.current.value === ''){

            setActionDescriptionMessage ('⚠ This field is required');
            errCounterActionDesc++;

        } else {
            setActionDescriptionMessage ('');
            errCounterActionDesc = 0
        }

        if (selectActionType.current.value === ''){

            setActionTypeMessage ('⚠ Selection of this field is required');
            errCounterActionType++;

        } else {
            setActionTypeMessage ('');
            errCounterActionType = 0
        }



        if (errCounterDate === 0 && errCounterActionDesc === 0 && errCounterActionType === 0 ){
            add();
        }


    }

    const add = () => {

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
                console.log("res.data in add () in Actions ", res.data);

            })
            .catch((error) => {
                console.error(error);
                setServerResponseErr(() => {

                    return "" + error ;
    
                });
            })
       

    }

    return (
        
        <div className="Action">
            
            <h1>Add Action Form</h1>

            <form onSubmit={(e)=>{validate(e);  console.log('btn Save Action clicked') }}> 

                <fieldset>
                    <label htmlFor = "Date" >Date</label> <br />
                    <input ref={inputDate} name="Date" type="date" placeholder="Enter Date" /> <br />
                    <span className="DateMessage"> {dateMessage} </span>
                </fieldset>
                
                <fieldset>
                    <label htmlFor = "ActionDescription">Action Description</label> <br />
                    <textarea ref={inputActionDescrition} name="ActionDescrition" rows="5" cols="66" placeholder="Enter Action Description" /> <br />
                    <span className="ActionDescriptionMessage"> {actionDescriptionMessage} </span>
                </fieldset>

                <fieldset>
                    <label htmlFor="ActionType">Action Type</label> <br />
                    <select ref={selectActionType} name="ActionType" id="ActionType-select">
                        <option value="">--Please select an action type--</option>
                        <option value="Phone">Phone</option>
                        <option value="Meeting">Meeting</option>    
                        <option value="Other">Other</option>    
                    </select> <br />
                    <span className="ActionTypeMessage"> {actionTypeMessage} </span>
                </fieldset>

                <button type="submit" >Save Action</button>

                <fieldset>
                    <span className="ServerResponseErr"> {serverResponseErr} </span>
                </fieldset>

            </form>
            

        </div>
    

    );
}

export default Actions;