import React, { Component, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import AuthService from '../services/AuthService';
import { withStyles } from '@material-ui/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';

const styles = () => ({
    card: {
        left: '-1rem',
        width: '30rem'
    },
    form: {
        width: '60rem'
    },
    component: {
        backgroundColor: '#f0f2f5',
        paddingTop: '10px',
        paddingBottom: '10px',
        minHeight: '92vh',
        color: 'black'
    },
    login_form: {
        paddingTop: '2rem',
        left: '12rem',
        position: 'relative'
    },
    register_button: {
        position: 'relative',
        paddingTop: '2rem',
        width: '20rem',
        left: '8.5rem'
    },
    padding_button_top: { paddingTop: '1rem' },
    form: {
        paddingRight: '1rem',
        paddingLeft: '1rem',
        paddingTop: '1rem',
        paddingBottom: '1rem'
    },
    passWordToggle: {
        position: 'absolute',
        top: '6rem',
        right: '7%',
        color: 'grey'
    }
});

class LoginUser extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onTogglePassword = this.onTogglePassword.bind(this);

        this.state = {
            email: '',
            password: '',
            loading: false,
            message: '',
            passwordToggle: false
        };
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onTogglePassword(e) {
        this.setState({
            passwordToggle: !this.state.passwordToggle
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: '',
            loading: true
        });

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.email, this.state.password).then(
                result => {
                    this.props.history.push('/home');
                },
                error => {
                    const resMessage =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.component}>
                <div className={`container ${classes.login_form}`}>
                    <h2>Login</h2>
                    <div className={`${classes.form}`}>
                        <Card className={`${classes.card}`}>
                            <Form
                                className={`${classes.form}`}
                                onSubmit={this.handleLogin}
                                ref={c => {
                                    this.form = c;
                                }}>
                                <div className={`${classes.padding_button_top} form-group`}>
                                    <Input
                                        placeholder="Email"
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                    />
                                </div>
                                <div className="form-group">
                                    <div>
                                        <Input
                                            placeholder="Password"
                                            type={this.state.passwordToggle ? 'text' : 'password'}
                                            className="form-control"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChangePassword}
                                        />
                                        <VisibilityIcon
                                            onClick={this.onTogglePassword}
                                            className={classes.passWordToggle}></VisibilityIcon>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <button
                                        className={`btn btn-primary btn-block `}
                                        disabled={this.state.loading}>
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Login</span>
                                    </button>
                                    <hr></hr>
                                    <p className="text-muted">
                                        Don't have an account yet ?{' '}
                                        <a href="/register-user">Sign Up!</a>
                                    </p>
                                </div>
                                {this.state.message && (
                                    <div className="form-group">
                                        <div className="alert alert-danger" role="alert">
                                            {this.state.message}
                                        </div>
                                    </div>
                                )}
                                <CheckButton
                                    style={{ display: 'none' }}
                                    ref={c => {
                                        this.checkBtn = c;
                                    }}
                                />
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(LoginUser);
