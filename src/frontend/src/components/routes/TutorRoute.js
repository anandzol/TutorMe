import React from 'react';
import AuthService from '../../services/AuthService';
import { Redirect, Route } from 'react-router-dom';

// components/routes/TutorRoute.js

const TutorRoute = ({ component: Component, ...rest }) => {
    const isTutor = AuthService.isTutor();

    return (
        <Route
            {...rest}
            render={props =>
                isTutor ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login-user', state: { from: props.location } }} />
                )
            }
        />
    );
};

export default TutorRoute;
