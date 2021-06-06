import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import CreateCourse from './components/CreateCourse';
import ShowCourseList from './components/ShowCourseList';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={ShowCourseList} />
                    <Route exact path="/create-course" component={CreateCourse} />
                </div>
            </Router>
        );
    }
}

export default App;
