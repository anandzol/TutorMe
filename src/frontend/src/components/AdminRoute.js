import React from 'react';
import AuthService from '../services/AuthService';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAdmin = AuthService.isAdmin();

    return (
        <Route
            {...rest}
            render={props =>
                isAdmin ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login-user', state: { from: props.location } }} />
                )
            }
        />
    );
};

export default PrivateRoute;
