import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import './App.css';

import CreateCourse from './components/CreateCourse';
import RegisterUser from './components/RegisterUser';
import HomeScreen from './components/HomeScreen';
import CreateUniversity from './components/CreateUniversity';
import CreateFaculty from './components/CreateFaculty';
import CreateOffering from './components/CreateOffering';
import NavigationBar from './components/NavigationBar';
import LoginUser from './components/LoginUser';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
class App extends Component {
    render() {
        return (
            <div>
                <NavigationBar></NavigationBar>
                <Router>
                    <div>
                        <Route path="/login-user" component={LoginUser} />
                        <Route exact path="/register-user" component={RegisterUser} />
                        <Route exact path="/" component={HomeScreen} />
                        <AdminRoute exact path="/create-course" component={CreateCourse} />
                        <AdminRoute exact path="/create-university" component={CreateUniversity} />
                        <AdminRoute exact path="/create-faculty" component={CreateFaculty} />
                        <PrivateRoute exact path="/create-offering" component={CreateOffering} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
