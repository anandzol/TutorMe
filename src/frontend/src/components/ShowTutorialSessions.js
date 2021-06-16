import { withStyles } from '@material-ui/styles';
import React, { Component, useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap/';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

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
        height: '5rem',
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
        fontWeight: '550',
        minWidth: '26rem',
        fontSize: '19px',
        width: '26rem',
        paddingBottom: '0.2rem',
        paddingTop: '0.2rem'
    },
    check_box_label: {
        fontSize: 'medium',
        width: '26rem'
    },
    checkbox_wrapper: {
        maxHeight: '18rem',
        width: '26rem',
        overflowY: 'scroll',
        overflowX: 'hidden',
        paddingLeft: '0.5rem'
    },
    check_box: {
        height: '2rem'
    },
    card: {
        width: '30rem',
        paddingTop: '1rem',
        paddingLeft: '1rem',
        paddingBottom: '1rem',
        minHeight: '50rem',
        maxHeight: '50rem',
        overflowY: 'scroll',
        overflowX: 'hidden'
    },
    cardWrapper: {
        paddingLeft: '1.5rem'
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

    const onToggleNode = e => {
        console.log(e);
    };

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
                <div className={classes.cardWrapper}>
                    <Card className={classes.card}>
                        <TreeView
                            onNodeSelect={onToggleNode}
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}>
                            {faculties.map((item, index) => {
                                return (
                                    <div classNames={classes.tree_item}>
                                        <TreeItem
                                            nodeId={item._id}
                                            label={item.name}
                                            classes={{ label: classes.tree_item_label }}>
                                            <div className={classes.checkbox_wrapper}>
                                                {item.courses.map((item, index) => {
                                                    const courseId = item._id;
                                                    return (
                                                        <div className={classes.check_box}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={
                                                                            selectedCourses[
                                                                                courseId
                                                                            ]
                                                                        }
                                                                        name={courseId}
                                                                        color="primary"
                                                                        onChange={onClick}
                                                                    />
                                                                }
                                                                classes={{
                                                                    label: classes.check_box_label
                                                                }}
                                                                label={item.name}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </TreeItem>
                                    </div>
                                );
                            })}
                        </TreeView>
                    </Card>
                </div>
            </Col>
        </Row>
    );
};

export default ShowTutorialSessions;
