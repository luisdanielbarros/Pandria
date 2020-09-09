import React, { useState } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_PROFILE } from '../redux/actions';
import { NavLink } from 'react-router-dom';
import MyModal from '../others/myModal';
import Row from 'react-bootstrap/row';
import Col from 'react-bootstrap/col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const UserProfile = () => {
    
    //Redux
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const { id, name, gender, birth } = user;
    const fullName = name.split(' ');
    const firstName = fullName[0];
    const lastName = fullName[1];
    const formattedBirth = new Date(birth).toISOString().split('T')[0];
    //Form Validation
    const Validated = 0;
    //Form Fields
    const firstNameRef = React.createRef();
    const lastNameRef = React.createRef();
    const genderRef = React.createRef();
    const birthRef = React.createRef();
    //Form States
    const [ editMode, setEditMode ] = useState(false);
    const toggleMode = () => { setEditMode(!editMode) }
    //Modal
    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const toggleModal = () => setIsModalVisible(!isModalVisible);
    //eslint-disable-next-line
    const [ modalContent, setModalContent ] = useState('');
    //Submit
    const handleSubmit = async(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMode();
        if (!editMode) return;
        const form = e.currentTarget;
        if (!form.checkValidity()) return;
        //Obtain the values from the form
        let name = firstNameRef.current.value + ' ' + lastNameRef.current.value;
        let gender = (genderRef.current.value) ? ('male') : ('female');
        let birth = birthRef.current.value;
        //Do the axios request
        axios({
            method: `POST`,
            port: 4000,
            url: `http://localhost:4000/users/update/${id}`,
            params: { name, gender, birth },
            headers: { "Content-Type": `application/json` }
        })
        .then(function (response) {
            //Modal
            if (response.data.hasOwnProperty('success') && response.data.success !== 1) {
                setModalContent(response.data.message);
                setIsModalVisible(true);
                return;
            }
            let updatedData = { name, gender, birth };
            //Dispatch
            dispatch({
                type: CHANGE_PROFILE,
                payload: {
                    name: updatedData.name,
                    gender: updatedData.gender,
                    birth: updatedData.birth
                }
            });
        })
        .catch( (error) => console.log(error));
    }
    return (
        <React.Fragment>
            {(isModalVisible) ? (<MyModal Title='Profile Change' Content={this.state.modalContent} Close={(toggleModal)} btnText='Close'/>): (<></>)}
            <Row className="userProfile">
                <Col md={4} xs={4}>
                    <Form id="userProfile-Form" validated={Validated} onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <h1>Profile</h1>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" defaultValue={firstName} placeholder="firstName" required ref={firstNameRef}
                                    readOnly={!editMode}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" defaultValue={lastName} placeholder="lastName" required ref={lastNameRef}
                                    readOnly={!editMode}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        name="Gender"
                                        label="Male"
                                        value="Male"
                                        required
                                        ref={genderRef}
                                        defaultChecked={gender === 'male' ? true : false}
                                        disabled={!editMode}
                                    />
                                    <Form.Check
                                        type="radio"
                                        name="Gender"
                                        label="Female"
                                        value="Female"
                                        required
                                        ref={genderRef}
                                        defaultChecked={gender === 'female' ? true : false}
                                        disabled={!editMode}
                                    />                            
                                    </Form.Group>
                                <Form.Group>
                                    <Form.Label>Birth Date</Form.Label>
                                    <Form.Control type="date" defaultValue={formattedBirth} placeholder="Birth Date" required ref={birthRef}
                                    disabled={!editMode}/>
                                </Form.Group>
                                <Form.Group className="userProfile-submit">
                                    <Button type="submit" className="float-right myBtn" >{(editMode) ? ('Commit Changes') : ('Edit Profile')}</Button>
                                </Form.Group>
                                <Form.Group className="mt-6 userProfile-link">
                                    <Form.Label>
                                        <NavLink to="profile/update-priv/username" className="nav-link">Change Username</NavLink>
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group className="userProfile-link">
                                    <Form.Label>
                                        <NavLink to="profile/update-priv/password" className="nav-link">Change Password</NavLink>
                                    </Form.Label>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </React.Fragment>
    )
}
export default UserProfile;