import { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    button__padding_top: {
        paddingTop: '20px'
    }
});
class HomeScreen extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <NavigationBar></NavigationBar>
                <div>Homescreen currently to access the different routes:</div>

                <div>
                    <button>
                        <a href="/create-course" className={classes.button__padding_top}>
                            Create Course
                        </a>
                    </button>
                    <button>
                        <a href="/register-user" className={classes.button__padding_top}>
                            Register User
                        </a>
                    </button>
                    <button>
                        <a href="/login" className={classes.button__padding_top}>
                            Login
                        </a>
                    </button>
                    <button>
                        <a href="/show-offerings" className={classes.button__padding_top}>
                            Show Offerings
                        </a>
                    </button>
                    <button>
                        <a href="/create-university" className={classes.button__padding_top}>
                            Create University
                        </a>
                    </button>
                    <button>
                        <a href="/create-faculty" className={classes.button__padding_top}>
                            Create Faculty
                        </a>
                    </button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(HomeScreen);
