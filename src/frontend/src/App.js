import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import CreateCourse from './components/CreateCourse';
import RegisterUser from './components/RegisterUser';
import HomeScreen from './components/HomeScreen';
import CreateUniversity from './components/CreateUniversity';
import CreateFaculty from './components/CreateFaculty';
import CreateOffering from './components/CreateOffering';
import NavigationBar from './components/NavigationBar';
class App extends Component {
    render() {
        return (
            <div>
                <NavigationBar></NavigationBar>
                <Router>
                    <div>
                        <Route exact path="/" component={HomeScreen} />
                        <Route exact path="/create-course" component={CreateCourse} />
                        <Route exact path="/register-user" component={RegisterUser} />
                        <Route exact path="/create-university" component={CreateUniversity} />
                        <Route exact path="/create-faculty" component={CreateFaculty} />
                        <Route exact path="/create-offering" component={CreateOffering} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
