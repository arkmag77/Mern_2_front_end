import React, { useState, useEffect } from 'react';
import {
    Link, 
    useNavigate,
    Outlet,
  } from "react-router-dom";

import axios from 'axios';
import './SingleCustomer.css';

function SingleCustomer(props) {

    let customerId = props.customerId;
    let actionCounter = 1;

    const [singleCustomer, setSingleCustomer] = useState([]);
    const [popUpWindow, setPopUpWindow] = useState(false);
    const [actionIdToDelete, setActionIdToDelete] = useState();

    useEffect(() => {
        getSingleCustomer(customerId);
    },[]);
    
    
    const getSingleCustomer = (customerId) => {

        // console.log(`funkcja getSingleCustomer (),  przekazane customerId: `, customerId);

        let axiosConfig = {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          };

        axios.get('http://www.localhost:8080/api/customer/'+customerId, axiosConfig)
            .then(response => {

                console.log("response data w getSingleCustomer () ", response.data);

                setSingleCustomer(() => {

                    return response.data;

                });

            })
            .catch((error) => {
                console.error(error);
            })
            
    }

    const removeAction = (customerId, actionId) => {

        // console.log(`funkcja removeAction (),  przekazane customerId: `, customerId);

        let axiosConfig = {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          };

        axios.delete('http://www.localhost:8080/api/customer/'+customerId+'/deleteAction/'+actionId, axiosConfig)
            .then(response => {

                console.log("response data w removeAction () ", response.data);

                setActionIdToDelete(() => {

                    return response.data;
                    // return response.data.filter(action => action !== actionId);

                });
                getSingleCustomer(customerId);

            })
            .catch((error) => {
                console.error(error);
            })
            
    }

    
    console.log("singleCustomer ", singleCustomer);

    let actions = singleCustomer.actions;
    console.log("actions", actions);
    
    let arr = Object.values(singleCustomer);
    console.log("arr", arr);

    let pElements = (arr)?.map((arrEl) =>  { 
         return (
             <p key={arrEl._id} >
                 <span className="CustomerAddress">Customer Address: {arrEl.street},  </span>
                 <span className="CustomerAddress">{arrEl.zipcode}  </span>
                 <span className="CustomerAddress">{arrEl.city},  </span>
             </p>
         );
     }) 

    let trElements = actions?.map((action) =>  { 
        return (
            <tr key={action._id} >
                <td className="ID">{actionCounter++}</td>
                <td className="ActionId">{action.date} </td>
                <td className="ActionType">{action.type} </td>
                <td className="ActionDesc">{action.action_description} </td> 
                <td> <button className="Btn" onClick={()=>{setPopUpWindow(true); setActionIdToDelete(action._id); console.log("setPopUpWindow wywołanie, action._id: ", action._id) /*props.removeMethod(event._id) */}}> Usuń </button></td>  
            </tr>
        );
    })

    

    return (

        <div className="SingleCustomer">
                
            <h4> <p>Customer Name: {singleCustomer.name}, </p>  {pElements[0]}   Customer NIP: {singleCustomer.nip} </h4>

            {popUpWindow && <div className="PopUpWindow" >
                    <p>Do You want to delete action?</p>
                    <button className="btnYes" onClick={()=>{console.log("Yes btn clicked, action._id:", actionIdToDelete); removeAction(customerId, actionIdToDelete); setPopUpWindow(false) }}> Yes </button>
                    <button className="btnNo" onClick={()=>{console.log("No btn clicked"); setPopUpWindow(false)}}> No </button>
            </div> }   

            <div className="ActionList">
                <table className="List">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Action Date</td>
                            <td>Action Type</td>
                            <td>Action Descrption</td>
                            <td>Action to Delete</td>
                            <td>Action to Edit</td>
                        </tr>
                    </thead>
                    <tbody>
                        {trElements}
                    </tbody> 
                </table>
            </div>

            

            <nav>
                <ul>
                    <li><Link to="details">Details</Link></li>
                    <li><Link to="actions">Actions</Link> </li>
                </ul>
            </nav>

            <Outlet/>

            
        </div>

        




    );

}

export default SingleCustomer;