import { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import AuthService from '../services/AuthService';
import { parseJwt } from '../services/AuthHeader';
const styles = theme => ({
    button__padding_top: {
        paddingTop: '20px'
    }
});

const defaultState = {
    firstName: '',
    lastName: '',
    role: '',
    email: ''
};
class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        const currentUser = parseJwt(AuthService.getCurrentUser());
        console.log(currentUser);
        if (currentUser !== undefined) {
            this.state = {
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                role: currentUser.role,
                email: currentUser.email
            };
        } else {
            this.state = defaultState;
        }
    }

    renderName() {
        let currentUser = parseJwt(AuthService.getCurrentUser());
        if (currentUser !== undefined) {
            return <div>{`Welcome ${this.state.firstName} ${this.state.lastName}`}</div>;
        } else {
            return <div></div>;
        }
    }

    onClick() {
        console.log(AuthService.getCurrentUser());
        console.log(this.state);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>Homescreen currently to access the different routes:</div>
                {this.renderName()}
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
