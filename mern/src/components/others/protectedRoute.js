import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({component: Component, ...rest}) => {

    const user = useSelector(state => state.user);

    return (
        <Route {...rest} render={
            props => !(!user.loggedIn) ? (<Component {...props}/>) : (<Redirect to={ { pathname: "/users/signin", state: { referer: props.location } } }/>)
        }/>
    );
}

export default ProtectedRoute;