import React from 'react';
import AuthService from '../../services/AuthService';
import { Redirect, Route } from 'react-router-dom';

// components/routes/PrivateRoute.js

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = AuthService.isLoggedIn();

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login-user', state: { from: props.location } }} />
                )
            }
        />
    );
};

export default PrivateRoute;
