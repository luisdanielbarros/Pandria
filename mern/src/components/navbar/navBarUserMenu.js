import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavBarUserMenu = () => {

    const user = useSelector(state => state.user);

    if (!user.loggedIn) {
        return (<React.Fragment>
            <Nav.Item>
                <NavLink to="/users/signup" className="nav-link">Sign up</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/users/signin" className="nav-link">Sign in</NavLink>
            </Nav.Item>
        </React.Fragment>);
    }
    else {
        return (
        <NavDropdown title={user.username} id="nav-dropdown">
            <LinkContainer to="/users/profile" className="nav-link">
                <NavDropdown.Item eventKey="1.1">Profile</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/users/profile" className="nav-link">
                <NavDropdown.Item eventKey="1.2">Messages</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/users/settings" className="nav-link">
                <NavDropdown.Item eventKey="1.3">My Orders</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to="/users/logout" className="nav-link">
                <NavDropdown.Item eventKey="1.4">Log out</NavDropdown.Item>
            </LinkContainer>
        </NavDropdown>);
    }
}

export default NavBarUserMenu;