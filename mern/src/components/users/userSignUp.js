import React from 'react';
import axios from 'axios';
import { connect  } from 'react-redux';
import { SIGN_IN } from '../redux/actions';
import { cookieExpirationDate } from '../others/util';
import Cookies from 'js-cookie';
import { NavLink, Redirect } from 'react-router-dom';
import MyModal from '../others/myModal';
import Row from 'react-bootstrap/row';
import Col from 'react-bootstrap/col';
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';

class UserSignUp extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            step: 0,
            activeStep: 0,
            isModalVisible: false,
            modalContent: ""
        }
    }
    //Form Fields
    firstName = React.createRef();
    lastName = React.createRef();
    Gender = React.createRef();
    birthDate = React.createRef();
    Username = React.createRef();
    Password = React.createRef();
    //Modal
    toggleModal = () => this.setState({isModalVisible: !this.state.isModalVisible});
    //Submit
    handleStep = targetStep => {
        if (this.state.step < targetStep) return true;
        else return false;
    }
    handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        let form = e.currentTarget;
        if (this.state.activeStep < this.state.step) this.setState({activeStep: this.state.step});
        else if (form.checkValidity() === true && this.state.step < 2) {
            this.setState({step: this.state.step + 1}, () => this.setState({activeStep: this.state.step}));
            this.setState({validated: true});
        }
        else if (form.checkValidity() === true) {
            this.setState({validated: true});
            this.handleRegistration(e)
        }
    }
    handleRegistration = async(e) => {
        //Register
        //Obtain the values from the form
        let username = this.Username.current.value;
        let password = this.Password.current.value;
        let firstName = this.firstName.current.value;
        let lastName = this.lastName.current.value;
        let name = firstName + ' ' + lastName;
        let gender = this.Gender.current.value;
        let birth = this.birthDate.current.value;
        let wishlist = [];
        //Do the axios request
        axios({
            method: `POST`,
            port: 4000,
            url: `http://localhost:4000/users/register`,
            params: { username, password, name, gender, birth, wishlist },
            headers: { "Content-Type": `application/json` }
        });

        //Login
        //Do the axios request
        axios({
            method: `GET`,
            port: 4000,
            url: `http://localhost:4000/users/login`,
            params: { username, password },
            headers:{ "Content-Type": `application/json` }
        })
        .then(function (response) {
            let receivedData = response.data.data;
            if (receivedData === undefined) return;
            //Dispatch
            this.props.dispatch({type: SIGN_IN, payload: {...receivedData}});
            //Cookies
            Cookies.set(`loggedIn`, true, { expires: cookieExpirationDate, path: ``, sameSite: `strict` });
            Cookies.set(`username`, receivedData.username, { expires: cookieExpirationDate, path: ``, sameSite: `strict` });
            Cookies.set(`loginHash`, receivedData.cookie, { expires: cookieExpirationDate, path: ``, sameSite: `strict` });        }.bind(this))
        .catch( (error) => console.log(error));
    }

    render() {
        return (
            <React.Fragment>
                {(this.props.user.loggedIn) ? (<Redirect to='/products'/>) : (<></>)}
                {(this.state.isModalVisible) ? (<MyModal Title='Login' Content={this.state.modalContent} Close={(this.state.toggleModal)} btnText='Close'/>): (<></>)}
                <Row className="userSignUp">
                    <Col md={4} xs={4}>
                        <Form id="userSignUp-Form" validated={this.state.validated} onSubmit={this.handleSubmit}>
                            <Tabs  activeKey={this.state.activeStep} id="userSignUp-Form-Tabs">
                                <Tab eventKey="0" title="Personal Information">
                                    <Row>
                                        <Col>
                                            <Form.Group>
                                                <h1>Sign Up</h1>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label className="userSignUp-link">
                                                    <NavLink to="/users/signin" className="nav-link">Already have an account?</NavLink>
                                                </Form.Label>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control type="text" placeholder="John" required ref={this.firstName}/>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control type="text" placeholder="Doe" required ref={this.lastName}/>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Gender</Form.Label>
                                                <Form.Check
                                                    type="radio"
                                                    name="Gender"
                                                    label="Male"
                                                    value="Male"
                                                    required
                                                    ref={this.Gender}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    name="Gender"
                                                    label="Female"
                                                    value="Female"
                                                    required
                                                    ref={this.Gender}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Birth Date</Form.Label>
                                                <Form.Control type="date" required ref={this.birthDate}/>
                                            </Form.Group>
                                            <Form.Group className="userSignUp-submit">
                                                <Button type="submit" style={{display: (this.handleStep(1) ? '' : 'none')}} className="float-right myBtn">Register</Button>
                                                <Button onClick={() => this.setState({activeStep: this.state.activeStep + 1})} style={{display: (this.handleStep(1) ? 'none' : '')}} className="float-right myBtn">Next</Button>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="1" title="Login Credentials">
                                    <Row>
                                        <Col md={6} xs={6}>
                                            <Form.Group>
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control type="text" placeholder="Johndoe" required ref={this.Username} disabled={this.handleStep(1)}/>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="12345" required ref={this.Password} disabled={this.handleStep(1)}/>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Check
                                                    type="checkbox"
                                                    name="TermsConditions"
                                                    label="I accept the terms and conditions"
                                                    required
                                                    disabled={this.handleStep(1)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="userSignUp-submit">
                                                <Button onClick={() => this.setState({activeStep: this.state.activeStep - 1})} className="float-left">Previous</Button>
                                                <Button type="submit" className="float-right myBtn">Register</Button>
                                            </Form.Group>                               
                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="2" title="Confirmation">
                                    <Row>
                                        <Col md={6} xs={6}>
                                            <Form.Group>
                                                <Form.Label>Confirmation Code</Form.Label>
                                                <Form.Control type="pastextsword" placeholder="12345" required disabled={this.handleStep(2)}/>
                                            </Form.Group>
                                            <Form.Group className="userSignUp-submit">
                                                <Button type="submit" className="myBtn">Confirm</Button>
                                            </Form.Group>                                 
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Form>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state
    return { user}
  }

export default connect(mapStateToProps)(UserSignUp);