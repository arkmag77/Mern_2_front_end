import React, { useState, useEffect } from 'react';
import './Customers.css';

import axios from 'axios';
import CustomersList from './CustomersList';

function Customers (props) {

    const [customersList, setCustomersList] = useState([]);

    

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {

        let axiosConfig = {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          };

        axios.get('http://www.localhost:8080/api/customer/all', axiosConfig )
            .then(response => {

                console.log("response data", response.data);

                /* setCustomersList(response.data); */

                setCustomersList(() => {

                    return response.data;

                });

            })
            .catch((error) => {
                console.error(error);
            })
    }

    const getCustomerId = (customerId) => {

        console.log(`funkcja getCustomerId () -wywołanie przekazane customerId: `+ customerId);

        props.setCustomerIdResp(() => {

            let customerIdResp;
            customerIdResp = customerId;
            return customerIdResp;

          });

        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json'
        // }

        // axios.delete(
        //     'http://www.localhost:8080/api/event/delete/'+eventId,
        //     /* JSON.stringify( *//* eventId *//* ) */
        //     { 'headers': headers })
        //     .then((response) => {

        //         console.log("response data w delete", response.data);

        //         setEventList(() => {

        //             return eventList.filter(eventListEl => eventListEl !== eventId);
        //             /* users.filter(user => user.id !== userID) */

        //         });
        //         getEventsData();
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     })
            
    }

    


    return (

        <div className="Customer">

            <p>Customers</p>

            <CustomersList detailsMethod={getCustomerId} customersList={customersList}  /> <p>Details</p>
        </div>


    );

}

export default Customers;