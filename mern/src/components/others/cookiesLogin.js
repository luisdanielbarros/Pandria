import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { COOKIE_SIGN_IN } from '../redux/actions';
import Cookies from 'js-cookie';

const CookiesLogin = () => {

    //Cookies
    const username = Cookies.get()['username'];
    const loginHash = Cookies.get()['loginHash'];

    //Redux
    const dispatch = useDispatch();

    //Check if the cookies exist
    if (!username || !loginHash) return (<></>);

    //Login
    const handleLogin = async(e) => {
        
        //Exit the procedure if the user is logged in or no cookies are found
        console.log(`Cookie Login`)
        //Do the axios request
        axios({
            method: `GET`,
            port: 4000,
            url: `http://localhost:4000/users/cookie-login`,
            params: { username, loginHash },
            headers: { "Content-Type": `application/json` }
        })  
        .then(function (response) {
            if (response.data.hasOwnProperty(`success`) && response.data.success !== 1) return;
            let receivedData = response.data.data;
            if (receivedData === undefined) return;
            //Dispatch
            dispatch({type: COOKIE_SIGN_IN, payload: {...receivedData}});
        })
        .catch( (error) => console.log(error));
    }
    handleLogin();
    return (<></>);
}

export default CookiesLogin;