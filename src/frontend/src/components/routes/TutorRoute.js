import React from 'react';
import AuthService from '../../services/AuthService';
import { Redirect, Route } from 'react-router-dom';

// components/routes/TutorRoute.js

const TutorRoute = ({ component: Component, ...rest }) => {
    const isTutor = AuthService.isTutor();
    const isAdmin = AuthService.isAdmin();

    const isTutorOrAdmin = isTutor || isAdmin;

    return (
        <Route
            {...rest}
            render={props =>
                isTutorOrAdmin ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login-user', state: { from: props.location } }} />
                )
            }
        />
    );
};

export default TutorRoute;
