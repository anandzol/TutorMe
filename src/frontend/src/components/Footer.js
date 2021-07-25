import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CopyrightIcon from '@material-ui/icons/Copyright';
import { MDBContainer } from 'mdbreact';

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: '#cad8ee',
        paddingTop: '5rem'
    }
}));

function Footer(props) {
    const classes = useStyles();

    return (
        <div className={`footer-copyright text-center py-3 ${classes.footer}`}>
            <MDBContainer fluid>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <a href="https://github.com/Minh13/TutorMe"> TutorMe</a>
            </MDBContainer>
        </div>
    );
}

export default Footer;
