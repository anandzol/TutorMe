import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import CreateCourse from './components/CreateCourse';
import RegisterUser from './components/RegisterUser';
import HomeScreen from './components/HomeScreen';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={HomeScreen} />
                    <Route exact path="/create-course" component={CreateCourse} />
                    <Route exact path="/register-user" component={RegisterUser} />
                </div>
            </Router>
        );
    }
}

export default App;
