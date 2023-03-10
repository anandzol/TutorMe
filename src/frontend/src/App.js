import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import AdminRoute from './components/routes/AdminRoute';
import TutorRoute from './components/routes/TutorRoute';
import PrivateRoute from './components/routes/PrivateRoute';
import Footer from './components/Footer';
import routes from './routes';

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <NavigationBar></NavigationBar>
                    <div>
                        {routes.map((item, i) => {
                            {
                                if (item.permission === 'admin') {
                                    return (
                                        <AdminRoute
                                            key={i}
                                            path={item.path}
                                            component={item.component}
                                        />
                                    );
                                } else if (item.permission === 'tutor') {
                                    return (
                                        <TutorRoute
                                            key={i}
                                            path={item.path}
                                            component={item.component}
                                        />
                                    );
                                } else if (item.permission === 'private') {
                                    return (
                                        <PrivateRoute
                                            key={i}
                                            path={item.path}
                                            component={item.component}
                                        />
                                    );
                                } else {
                                    return (
                                        <Route
                                            key={i}
                                            path={item.path}
                                            component={item.component}
                                            exact
                                        />
                                    );
                                }
                            }
                        })}
                    </div>
                </Router>
                <Footer />
            </div>
        );
    }
}

export default App;
