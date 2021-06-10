import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavigationBar from '../components/NavigationBar';
import { withStyles } from '@material-ui/styles';
import '../App.css';
import axios from 'axios';

const styles = () => ({});

class CreateOffering extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <NavigationBar></NavigationBar>
            </div>
        );
    }
}

export default withStyles(styles)(CreateOffering);
