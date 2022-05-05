import React, { useState, useEffect } from 'react';
import './Customers.css';

import axios from 'axios';
import CustomersList from './CustomersList';

function Customers(props) {

    const [customersList, setCustomersList] = useState([]);

    const inputName = React.useRef();
    const inputStreet = React.useRef();
    // const inputNumber = React.useRef();
    const inputZipcode = React.useRef();
    const inputCity = React.useRef();
    const inputNip = React.useRef();


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

        axios.get('http://www.localhost:8080/api/customer/all', axiosConfig)
            .then(response => {

                console.log("response data getCustomers()", response.data);

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

        console.log(`funkcja getCustomerId () -wywołanie przekazane customerId: ` + customerId);

        props.setCustomerIdResp(() => {

            // let customerIdResp;
            // customerIdResp = customerId;
            // return customerIdResp;
            return customerId;

        });

    }

    const removeCustomer = (customerId) => {

        console.log(`funkcja removeCustomer () -wywołanie, przekazane customerId: ` + customerId)

        let axiosConfig = {
            headres: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        };

        axios.delete('http://www.localhost:8080/api/customer/delete/' + customerId, axiosConfig)
            .then(response => {

                console.log(`response.data w removeCustomer()`, response.data)

                setCustomersList(() => {

                    return customersList;

                });

                getCustomers();

            })

            .catch((error) => {

                console.log(error);

            })



    }

    const editCustomer = (e, customerId) => {


        e.preventDefault();
        console.log(`funkcja editCustomer () -wywołanie, przekazane customerId: ` + customerId)

        // let editedaddress = {
        //     street: inputStreet.current.value,
        //     city: inputCity.current.value,
        //     zipcode: inputZipcode.current.value
        // };

        let editedCustomer = {
            name: inputName.current.value,
            address:{
                street: inputStreet.current.value,
                city: inputCity.current.value,
                zipcode: inputZipcode.current.value
            },
            nip: inputNip.current.value
        };

        // console.log('editedCustomer: ', editedCustomer.name, /* editedaddress.street, editedaddress.city, editedaddress.zipcode, */ editedCustomer.nip);

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        axios.put(
            'http://www.localhost:8080/api/customer/update/' + customerId,
            JSON.stringify(editedCustomer),
            { 'headers': headers })
            .then((response) => {

                console.log("response data w editCustomer", response.data);
                getCustomers();
            })
            .catch((error) => {
                console.error(error);
            })


    }




    return (

        <div className="Customer">

            <p>Customers</p>
            <CustomersList detailsMethod={getCustomerId} customersList={customersList} removeCustomer={removeCustomer} 
            inputName={inputName} inputStreet={inputStreet} inputCity={inputCity} inputZipcode={inputZipcode} inputNip={inputNip}  editCustomer={editCustomer} />
        
        </div>


    );

}

export default Customers;