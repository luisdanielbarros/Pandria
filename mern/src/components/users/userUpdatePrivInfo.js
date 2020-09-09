import React, { useRef, useState } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_PROFILE } from '../redux/actions';
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import MyModal from '../others/myModal';
import Row from 'react-bootstrap/row';
import Col from 'react-bootstrap/col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const UserUpdatePrivInfo = () => {

    //Redux
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const { id } = user;
    //Form Validation
    const Validated = 0;
    //Form Fields
    const privInfoRef = React.createRef();
    const passwordRef = React.createRef();
    const confirmPasswordRef = React.createRef();
    const reRef = useRef();
    //Form States
    const Location = useLocation();
    const editMode = () => {
        let locationSplit = Location.pathname.split(`/`);
        switch (locationSplit[locationSplit.length-1]) {
            case `username`:
                return 0;
            case `password`:
                return 1;
            default:
                onError();
        }
    }
    const privInfoString = () => {
        switch (editMode()) {
            case 0:
                return `Username`;
            case 1:
                return `Password`;
            default:
                onError();
        }
    }
    //On Error
    const onError = () => {
        setModalContent(`Bad URL`);
        setIsModalVisible(true);
        setIsFinished(true);
    }
    //Modal
    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const toggleModal = () => setIsModalVisible(!isModalVisible);
    const [ modalContent, setModalContent ] = useState('');
    const [ isFinished, setIsFinished ] = useState(false);
    //Go Back
    const History = useHistory();
    //Submit
    const handleSubmit = async(e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        //If the form is valid
        if (!form.checkValidity()) return;
        //Obtain the values from the form
        let privInfo = privInfoRef.current.value;
        let password = passwordRef.current.value;
        let confirmPassword = confirmPasswordRef.current.value;
        const recaptcha = await reRef.current.executeAsync();
        reRef.current.reset();
        //If the passwords match
        if (password !== confirmPassword) {
            setModalContent(`Passwords don't match.`);
            setIsModalVisible(true);
            return;
        }
        //Create the parameters for the axios request
        let axiosPath;
        let inputParams;
        switch (editMode()) {
            case 0:
                axiosPath = `http://localhost:4000/users/update-username`;
                inputParams = { id, username: privInfo, password, recaptcha }
                break;
            case 1:
                axiosPath = `http://localhost:4000/users/update-password`;
                inputParams = { id, newPassword: privInfo, password, recaptcha }
                break;
            default:
                onError();
        }
        //Do the axios request
        axios({
            method: `GET`,
            port: 4000,
            url: axiosPath,
            params: inputParams,
            headers:{ "Content-Type": `application/json` }
        })  
        .then(function (response) {
            if (response.data.success !== 1) {
                //Modal
                setModalContent(response.data.message);
                setIsModalVisible(true);
                return;
            }
            let updatedData = { 'username': privInfo };
            if (editMode() === 1) updatedData = { 'password': privInfo };
            //Dispatch
            dispatch({
                type: CHANGE_PROFILE,
                payload: updatedData
            });
        })
        .catch( (error) => console.log(error));
    }
    return (
        <React.Fragment>
            {(isModalVisible) ? (<MyModal Title={`${privInfoString()} Change`} Content={modalContent} Close={(isFinished) ? (<Redirect to='/products'/>) : (toggleModal)} btnText='Close'/>): (<></>)}
            <Row className="userUpdatePrivInfo">
                <Col md={4} xs={4}>
                    <Form id="userUpdatePrivInfo-Form" validated={Validated} onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <h1>Profile</h1>
                                    <h2>Sensitive Information</h2>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>{`New ${privInfoString()}`}</Form.Label>
                                    <Form.Control type="text" placeholder={`New ${privInfoString()}`} required ref={privInfoRef}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" required ref={passwordRef} autoComplete="new-password"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" required ref={confirmPasswordRef} autoComplete="new-password"/>
                                </Form.Group>
                                <ReCAPTCHA sitekey="6LfmV7sZAAAAAMj7hsaUeagJ3UAoy2WizcE3Wzm1" size="invisible" ref={reRef}/>
                                <Form.Group className="userUpdatePrivInfo-submit">
                                    <Button type="submit" className="float-right myBtn" >{(editMode()) ? ('Commit Changes') : ('Change '+privInfoString())}</Button>
                                </Form.Group>
                                <Form.Group className="userUpdatePrivInfo-go-back">
                                    <Button onClick={() => History.replace('/users/profile')} className="float-left myBtn">Go Back</Button>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </React.Fragment>
    )
}
export default UserUpdatePrivInfo;