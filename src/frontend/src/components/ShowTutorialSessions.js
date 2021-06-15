import { withStyles } from '@material-ui/styles';
import React, { Component, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap/';
import SearchField from 'react-search-field';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import { makeStyles } from '@material-ui/styles';
import { getUniversityById } from '../services/UniversityService';
import { getAllVerifiedSessionsByUniversity } from '../services/SessionService';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const useStyles = makeStyles(theme => ({
    component: {
        paddingTop: '2rem',
        paddingLeft: '1rem'
    },
    treepane: {
        paddingTop: '1rem',
        paddingLeft: '1rem'
    },
    searchField: {
        width: '30rem',
        paddingLeft: '1.5rem',
        paddingBottom: '2rem'
    },
    padding_top: {
        paddingTop: '3rem'
    },
    padding_bottom: {
        paddingBottom: '3rem'
    },
    tree_item_label: {
        fontSize: '1.5rem',
        width: '25rem'
    },
    check_box_label: {
        width: '25rem',
        paddingTop: '0rem',
        paddingBottom: '0rem'
    }
}));

const ShowTutorialSessions = () => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [allSessions, setAllSessions] = useState([]);
    const [displayedSessions, setDisplayedSessions] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState({});
    const [selectedFaculty, setSelectedFaculty] = useState('');

    // For development purposes, will need to be either fetched dynamically by user/ passed on by props of hoc
    const [university, setUniversity] = useState('60bff011a5e1000beeddb38e');

    useEffect(() => {
        getUniversityById(
            university,
            response => {
                setFaculties(response.data.faculties);

                let tmp = {};
                response.data.courses.forEach((item, _) => {
                    const courseId = item._id;
                    tmp[courseId] = false;
                });
                setSelectedCourses(tmp);
            },
            error => {
                console.error(error);
            }
        );

        getAllVerifiedSessionsByUniversity(
            university,
            response => {
                // Initially display all sessions of the university

                setAllSessions(response.data);
                setDisplayedSessions(response.data);
            },
            error => {
                console.error(error);
            }
        );
    }, []);

    const onChange = e => {
        console.log(selectedCourses);
    };

    const onClick = e => {
        setSelectedCourses({ ...selectedCourses, [e.target.name]: e.target.checked });
    };

    const classes = useStyles();
    return (
        <Row className={classes.component}>
            <Col xs={3} className="col">
                <div className={classes.searchField}>
                    <SearchField
                        placeholder="Search..."
                        onChange={onChange}
                        searchText=""
                        classNames={classes.searchField}
                    />
                </div>
                <TreeView>
                    {faculties.map((item, index) => {
                        return (
                            <div classNames={classes.tree_item}>
                                <TreeItem
                                    nodeId={item._id}
                                    label={item.name}
                                    classes={{ label: classes.tree_item_label }}>
                                    {item.courses.map((item, index) => {
                                        const courseId = item._id;
                                        return (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={selectedCourses[courseId]}
                                                        name={courseId}
                                                        color="primary"
                                                        onChange={onClick}
                                                    />
                                                }
                                                classes={{ label: classes.check_box_label }}
                                                label={item.name}
                                            />
                                        );
                                    })}
                                </TreeItem>
                            </div>
                        );
                    })}
                </TreeView>
            </Col>
        </Row>
    );
};

export default ShowTutorialSessions;
