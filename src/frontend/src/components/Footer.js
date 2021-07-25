import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MDBContainer } from 'mdbreact';

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: 'white',
        bottom: 0
    }
}));

function Footer(props) {
    const classes = useStyles();

    return (
        <div className={`footer-copyright text-center py-3 ${classes.footer}`}>
            <MDBContainer>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <a href="https://github.com/Minh13/TutorMe"> TutorMe</a>
            </MDBContainer>
        </div>
    );
}

export default Footer;
