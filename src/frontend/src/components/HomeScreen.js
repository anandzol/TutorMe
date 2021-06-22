import { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import AuthService from '../services/AuthService';
const styles = theme => ({
    button__padding_top: {
        paddingTop: '20px'
    }
});
class HomeScreen extends Component {
    onClick() {
        console.log(AuthService.getCurrentUser());
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>Homescreen currently to access the different routes:</div>

                <div>
                    <button>
                        <a href="/register-user" className={classes.button__padding_top}>
                            Register User
                        </a>
                    </button>
                    <button>
                        <a href="/show-sessions" className={classes.button__padding_top}>
                            Show Tutorial Sessions
                        </a>
                    </button>
                    <button>
                        <a href="/create-tutorial-session" className={classes.button__padding_top}>
                            Create Tutorial Session
                        </a>
                    </button>
                    <button>
                        <a href="/login-user" className={classes.button__padding_top}>
                            Login User
                        </a>
                    </button>
                    <button onClick={this.onClick}>Test Button</button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(HomeScreen);
