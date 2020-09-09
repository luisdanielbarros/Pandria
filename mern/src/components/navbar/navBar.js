import React from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { CHANGE_THEME } from '../redux/actions';
import { cookieExpirationDate } from '../others/util';
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';
import NavBarUserMenu from './navBarUserMenu';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { BsBookHalf } from 'react-icons/bs';

const NavBar = () => {

    //Redux
    let currentTheme = Cookies.get(`theme`);
    const reduxTheme = useSelector(state => state.user.theme);
    if (currentTheme === undefined) currentTheme = reduxTheme;
    const dispatch = useDispatch();

    const handleThemeChange = e => {
        let controlTheme = `default`;
        if (e.target.checked) controlTheme = `dark`;
        Cookies.set(`theme`, controlTheme, { expires: cookieExpirationDate, path: ``, sameSite: `strict` });
        dispatch({type: CHANGE_THEME, payload: controlTheme});
    }

    return (
        <Navbar id="navigationBar" className="pb-1 pt-1" fixed="top" expand="md" defaultExpanded="true" bg="dark" variant="dark">
            <NavLink to="/" className="navbar-brand"><BsBookHalf/>Pandria</NavLink>
            <Navbar.Toggle data-toggle="collapse" data-target="#basic-navbar-nav" aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Item>
                        <NavLink to="/products" className="nav-link">Products</NavLink>
                    </Nav.Item>
                </Nav>
                <Nav>
                    <Form.Check className="theme-toggler" onChange={handleThemeChange} checked={currentTheme === `dark`} id="theme-switch" type="switch" label="Dark Theme"/>
                    <NavBarUserMenu/>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;