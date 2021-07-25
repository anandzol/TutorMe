import React from 'react';
import { MDBContainer } from 'mdbreact';
function Footer() {
    return (
        <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <a href="https://github.com/Minh13/TutorMe"> TutorMe</a>
            </MDBContainer>
        </div>
    );
}

export default Footer;
