import { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';
class HomeScreen extends Component {
    render() {
        return (
            <div>
                <NavigationBar></NavigationBar>
                <div>Homescreen currently to access the different routes:</div>

                <div>
                    <button>
                        <a href="/create-course" style={{ paddingTop: 20 }}>
                            Create Course
                        </a>
                    </button>
                    <button>
                        <a href="/register-user" style={{ paddingTop: 20 }}>
                            Register User
                        </a>
                    </button>
                </div>
            </div>
        );
    }
}

export default HomeScreen;
