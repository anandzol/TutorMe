import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import AdminRoute from './components/routes/AdminRoute';
import TutorRoute from './components/routes/AdminRoute';
import PrivateRoute from './components/routes/AdminRoute';

import routes from './routes';

class App extends Component {
    render() {
        return (
            <div>
                <NavigationBar></NavigationBar>
                <Router>
                    <div>
                        {routes.map((route, i) => {
                            if (route.permission === 'admin') {
                                return <AdminRoute key={i} {...route} />;
                            } else if (route.permission === 'tutor') {
                                return <TutorRoute key={i} {...route} />;
                            } else if (route.permission === 'private') {
                                return <PrivateRoute key={i} {...route} />;
                            } else {
                                return <Route key={i} {...route} />;
                            }
                        })}
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
