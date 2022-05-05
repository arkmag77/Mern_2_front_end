import React, { useState, useEffect} from 'react';

import {
    Link, Navigate, useNavigate
  } from "react-router-dom";

import './SignIn.css';

import axios from 'axios';

function SignIn (props) {

    const [userNameMessage, setUserNameMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [serverRespErr, setServerRespErr] = useState('');

    const inputUserName = React.useRef();
    const inputPassword = React.useRef();

    let navigate = useNavigate();

    const validate = (e) => {
        
        console.log(`validate () w SignIn - wywołanie`)
        e.preventDefault();

        let errCounter=0;
        let userNameMessage;
        let passwordMessage;

        if (inputUserName.current.value.trim() === '') {

            errCounter++

            setUserNameMessage (() => {
                
                console.log(`warunek  if w validate () w SignIn - wywołanie`);
                return userNameMessage = '⚠ User name is required';

            });
        } else if (inputUserName.current.value.trim().length <= 3)  {

            errCounter++;
    
            setUserNameMessage (() => {

                console.log(`warunek else if w validate () w SignIn - wywołanie`);
                return userNameMessage = '⚠ User name  is too short, at least 4 char are required';
    
            });      

        } else {

            errCounter=0;
    
            setUserNameMessage (() => {

                console.log(`warunek else w validate () w SignIn - wywołanie`);
                return userNameMessage = '';
    
            });
        }

        if (inputPassword.current.value.trim() === '') {

            errCounter++;

            setPasswordMessage (()=>{

                console.log(`warunek if w validate () setPasswordMessage() w SignIn - wywołanie`);
                return /* passwordMessage =  */'⚠ Password is required';

            });
        } else {

            errCounter = 0;
            setPasswordMessage(() => {
                
                console.log(`warunek else w validate () setPasswordMessage() w SignIn - wywołanie`);
                return passwordMessage = '';

            });
        }

        if (errCounter === 0) {

            LogIn();

        }

    }

    const LogIn = () => {

        console.log ('Login () w SignIn - wywołanie');
        let logedUser = {
            username: inputUserName.current.value,
            password: inputPassword.current.value,
            ttl: 3600
        };

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        axios.post('http://www.localhost:8080/api/user/login', 
        JSON.stringify(logedUser), 
        {'headers': headers})
        .then((response)=> {


            if (response.data.success === true) {


                props.setUserServerResp (() => {
                
                    console.log('response.data', response.data)
                    console.log('response.data.success', response.data.success)
                    return response.data.success;

                });

                navigate("/");

                localStorage.setItem("response.data", JSON.stringify(response.data));
            }  
            
            if (response.data.success === false) {

                props.setUserServerResp (() => {
                
                    console.log('response.data', response.data.success)
                    return response.data.success;

                });

                setServerRespErr (() => {

                    return "User name and Password do not match";

                });

                // localStorage.setItem("serverResponse", null);

            }

        })

        .catch((err)=>{
            console.error(err);
            console.log(err);
            setServerRespErr (() => {

                return "" + err ;

            });
        });

    }


    return (

        <div className="SignIn">

            {/* {props.userServerResp && <Navigate to = "/" />} */}

            <h1>Sign In form</h1>
            <form onSubmit = {(e)=>{validate(e)}}>
                <fieldset>
                <label htmlFor="UserName">User Name</label> <br />
                    <input ref={inputUserName} name="UserName" type="text" placeholder="Enter User Name" />
                    <span className="UserNameMessage"> {userNameMessage} </span>
                </fieldset>

                <fieldset>
                    <label htmlFor="Password">Password</label> <br />
                    <input ref={inputPassword} name="Password" type="text" placeholder="Enter Password" />
                    <span className="PasswordMessage"> {passwordMessage} </span>
                </fieldset>

                <button type="submit"> Sign In</button>

                <fieldset>
                    <span className="ServerRespErr"> {props.userServerResp.message} {serverRespErr} </span>
                </fieldset>

            </form>
    
        </div>

    );

}

export default SignIn;