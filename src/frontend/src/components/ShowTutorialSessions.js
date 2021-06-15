import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap/';
import SearchField from 'react-search-field';
import { TreeItem } from '@material-ui/lab';
import { getAllUniversities } from '../services/UniversityService';
const defaultState = {
    selectedFilters: [],
    displayedSessions: []
};

const styles = () => ({
    component: {
        paddingTop: '2rem',
        paddingLeft: '1rem'
    },
    treepane: {
        position: 'absolute',
        paddingTop: '3rem',
        paddingLeft: '1rem'
    },
    searchField: {
        position: 'absolute',
        width: '30rem'
    },
    paddingTop: {
        paddingTop: '3rem'
    }
});

class ShowTutorialSessions extends Component {
    constructor() {
        super();
        this.state = defaultState;
    }

    onChange = e => {
        console.log(e);
    };

    render() {
        const { classes } = this.props;
        return (
            <Row className={classes.component}>
                <Col xs={3} className="col">
                    <SearchField
                        placeholder="Search..."
                        onChange={this.onChange}
                        searchText=""
                        classNames={classes.searchField}
                    />
                    <Row className={classes.treepane}>Test</Row>
                </Col>
            </Row>
        );
    }
}

export default withStyles(styles)(ShowTutorialSessions);
