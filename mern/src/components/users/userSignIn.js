import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_IN } from '../redux/actions';
import { cookieExpirationDate } from '../others/util';
import Cookies from 'js-cookie';
import { NavLink, Redirect } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import MyModal from '../others/myModal';
import { Row, Col, Form, Button } from 'react-bootstrap';

const UserSignIn = () => {

    //Redux
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    //Form Validation
    const Validated = 0;
    const [ Attempts, setAttempts ] = useState(0);
    const maximumAttempts = 3;
    //Form Fields
    const usernameRef = React.createRef();
    const passwordRef = React.createRef();
    const reRef = useRef();
    //Modal
    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const toggleModal = () => setIsModalVisible(!isModalVisible);
    const [ modalContent, setModalContent ] = useState('');
    //Submit
    const handleSubmit = async(e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        //If the form is valid
        if (!form.checkValidity()) return;
        //Obtain the values from the form
        let username = usernameRef.current.value;
        let password = passwordRef.current.value;
        let recaptcha = false;
        if (Attempts >= maximumAttempts) {
            recaptcha = await reRef.current.executeAsync();
            reRef.current.reset();
        }
        //Do the axios request
        axios({
            method: `GET`,
            port: 4000,
            url: `http://localhost:4000/users/login`,
            params: { username, password, recaptcha },
            headers:{ "Content-Type": `application/json` }
        })
        .then(function (response) {
            setAttempts(Attempts+1)
            //Modal
            if (response.data.hasOwnProperty(`success`) && response.data.success !== 1) {
                setModalContent(response.data.message);
                setIsModalVisible(true);
                return;
            }
            let receivedData = response.data.data;
            if (receivedData === undefined) return;
            //Dispatch
            dispatch({type: SIGN_IN, payload: {...receivedData}});
            //Cookies
            Cookies.set(`loggedIn`, true, { expires: cookieExpirationDate, path: ``, sameSite: `strict` });
            Cookies.set(`username`, receivedData.username, { expires: cookieExpirationDate, path: ``, sameSite: `strict` });
            Cookies.set(`loginHash`, receivedData.cookie, { expires: cookieExpirationDate, path: ``, sameSite: `strict` });
        })
        .catch( (error) => console.log(error));
    }

    return(
        <React.Fragment>
            {(user.loggedIn) ? (<Redirect to='/products'/>) : (<></>)}
            {(isModalVisible) ? (<MyModal Title='Login' Content={modalContent} Close={(toggleModal)} btnText='Close'/>): (<></>)}
            <Row className="userSignIn">
                <Col md={4} xs={4}>
                    <Form id="userSignIn-Form" validated={Validated} onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <h1>Sign In</h1>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Username" required ref={usernameRef}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" required ref={passwordRef}/>
                                </Form.Group>
                                <Form.Group className="userSignIn-submit">
                                    <Button type="submit" className="float-right myBtn">Login</Button>
                                </Form.Group>
                                {(Attempts >= maximumAttempts) ? (<ReCAPTCHA sitekey="6LfmV7sZAAAAAMj7hsaUeagJ3UAoy2WizcE3Wzm1" size="invisible" ref={reRef} />) : (<></>)}
                                <Form.Group className="userSignIn-link">
                                    <Form.Label>
                                        <NavLink to="/users/signup" className="nav-link">Sign up</NavLink>
                                    </Form.Label>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default UserSignIn;