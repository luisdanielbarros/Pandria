import React from "react";
import { useDispatch } from 'react-redux';
import { LOG_OUT } from '../redux/actions';
import ProductList from '../products/product_list/productList';
import Container from 'react-bootstrap/container';
import Row from 'react-bootstrap/row';
import Col from 'react-bootstrap/col';

const UserLogout = () => {

    //Dispatch
    const dispatch = useDispatch();
    dispatch({type: LOG_OUT});

    return (
        <Container fluid>
            <Row className="userLogout">
                <Col className="d-flex align-items-center justify-content-center">
                    <h1>You have logged out.</h1>
                </Col>
            </Row>
            <ProductList/>
        </Container>
    );
}

export default UserLogout;