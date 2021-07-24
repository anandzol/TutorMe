import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/styles';
import formattedDate from '../utils/DateUtils';

const styles = () => ({
    card: {
        height: '10rem'
    },
    header: {
        fontSize: '18px',
        textAlign: 'center',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        fontWeight: 500
    },
    description: {
        paddingTop: '0.5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        maxHeight: '6rem',
        overFlowY: 'auto'
    }
});

class SessionCard extends Component {
    constructor(props) {
        super();
        console.log(props.session);
        this.state = props.session;
    }

    render() {
        const { classes } = this.props;

        let location = '';
        if (this.state.onsite) {
            location += ' Onsite';
        }
        if (this.state.remote) {
            location += ' Remote';
        }

        return (
            <div className={classes.card}>
                <Card>
                    <div className={classes.header}>{this.state.course.name}</div>
                    <div className={classes.description}>{this.state.description}</div>
                    <div className={classes.price}>{this.state.price}</div>
                    <div className={classes.location}>{location}</div>
                </Card>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(SessionCard));
