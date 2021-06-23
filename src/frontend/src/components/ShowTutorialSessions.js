import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap/';
import SearchField from 'react-search-field';
import { TreeView, TreeItem, Rating } from '@material-ui/lab/';
import { makeStyles } from '@material-ui/styles';
import { getUniversityById } from '../services/UniversityService';
import { getAllVerifiedSessionsByUniversity } from '../services/SessionService';
import { FormControlLabel, Checkbox } from '@material-ui/core/';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Slider, Grid, FormGroup, Typography } from '@material-ui/core/';
import DatePicker from 'react-datepicker';
import TutorialSessionComponent from './TutorialSessionComponent';
import './styles/styles.css';

const useStyles = makeStyles(theme => ({
    component: {
        paddingTop: '3rem',
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
        overflowY: 'auto',
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
        height: '62rem',
        minHeight: '20rem',
        maxHeight: '62rem',
        overflowY: 'auto',
        overflowX: 'hidden'
    },
    card_wrapper: {
        paddingLeft: '1.5rem'
    },
    slider: {
        width: 200,
        paddingTop: '1rem'
    },
    slider_wrapper: {
        paddingLeft: '2rem'
    },
    ratingFilter: {
        paddingTop: '0.4rem'
    },
    ratingFilter_wrapper: {
        width: '8rem',
        paddingLeft: '3rem'
    },
    filterCol: {
        paddingTop: '2rem'
    },
    datePicker: {
        paddingTop: '0.3rem',
        height: '2rem',
        borderColor: '#ced4da'
    },
    sortSessions: {
        paddingTop: '2rem'
    },
    sessionCard: {
        height: '60rem',
        maxHeight: '60rem',
        minHeight: '10rem',
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '103rem'
    }
}));

function valuetext(value) {
    return `${value}€`;
}

const marks = [
    {
        value: 1,
        label: '1€'
    },
    {
        value: 50,
        label: '50€'
    }
];
const ShowTutorialSessions = () => {
    const [allSessions, setAllSessions] = useState([]);
    const [displayedSessions, setDisplayedSessions] = useState([]);
    const [courseFilteredSessions, setCourseFilteredSessions] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [location, setLocation] = useState(1);
    const [language, setLanguage] = useState('both');
    const [experience, setExperience] = useState(0);
    const [price, setPriceFilter] = useState([1, 50]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [sortValue, setSortValue] = useState(-1);
    const [initialRender, setInitialRender] = useState(true);
    const [loading, setLoading] = useState(false);

    // For development purposes, will need to be either fetched dynamically by user/ passed on by props of hoc
    const [university, setUniversity] = useState('60bff011a5e1000beeddb38e');

    useEffect(() => {
        setLoading(true);
        // Prevent api calls everytime a value changes
        if (initialRender) {
            getUniversityById(
                university,
                response => {
                    setFaculties(response.data.faculties);

                    let tmp = [];
                    response.data.courses.forEach((item, _) => {
                        const course = {
                            id: item._id,
                            selected: false
                        };
                        tmp.push(course);
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
                    setCourseFilteredSessions(response.data);
                    setDisplayedSessions(response.data);
                },
                error => {
                    console.error(error);
                }
            );
            setInitialRender(false);
        }

        filterSessions();
        setLoading(false);
    }, [location, price]);

    const onToggleNode = e => {};

    const onSearch = e => {
        console.log(selectedCourses);
    };

    const onChangeLocation = e => {
        setLocation(e.target.value);
    };

    const onChangeSlider = (e, newValue) => {
        setPriceFilter(newValue);
    };

    const filterSessions = () => {
        // Filter by minimum price range first
        const minimumPrice = price[0];
        const maximumPrice = price[1];
        let sessions = courseFilteredSessions;
        sessions = courseFilteredSessions.filter(
            session => session.price >= minimumPrice && session.price <= maximumPrice
        );

        // Filter by location
        switch (location) {
            case '1':
                sessions = sessions;
                break;

            case '2':
                sessions = sessions.filter(session => session.onsite);

                break;
            case '3':
                sessions = sessions.filter(session => session.remote);
                break;
            default:
                sessions = sessions;
        }
        setDisplayedSessions(sessions);
    };

    const onClickCheckbox = e => {
        const course = {
            id: e.target.name,
            selected: e.target.checked
        };

        const index = selectedCourses.findIndex(item => item.id === e.target.name);
        let currentCourses = selectedCourses;
        currentCourses[index] = course;
        setSelectedCourses(currentCourses);

        // Get all courses which are currently selected
        let filteredCourses = selectedCourses
            .filter(course => course.selected)
            .map(course => course.id);

        // Filter all displayed sessions based on wether their course is selected in the checkbox
        let sessions = allSessions.filter(session => filteredCourses.includes(session.course._id));

        // If there are no selected courses, display all sessions
        if (filteredCourses === undefined || filteredCourses.length === 0) {
            setDisplayedSessions(allSessions);
            setCourseFilteredSessions(allSessions);
        } else {
            setCourseFilteredSessions(sessions);
            setDisplayedSessions(sessions);
        }
    };

    const onSort = e => {
        setSortValue(e.target.value);
        switch (e.target.value) {
            case '1':
                setDisplayedSessions(displayedSessions.sort((a, b) => a.price - b.price));
                break;
            case '2':
                setDisplayedSessions(displayedSessions.sort((a, b) => b.price - a.price));
                break;
            case '3':
                setDisplayedSessions(
                    displayedSessions.sort(
                        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    )
                );
                break;
            case '4':
                setDisplayedSessions(
                    displayedSessions.sort((a, b) => a.course.name.localeCompare(b.course.name))
                );
                break;
            default:
                console.error('no available sort option');
        }
    };

    const onChangeDate = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const classes = useStyles();
    return (
        <Row className={classes.component}>
            <Col xs={3} className={`col ${classes.filterCol}`}>
                <div className={classes.searchField}>
                    <SearchField
                        placeholder="Search..."
                        onChange={onSearch}
                        searchText=""
                        classNames={classes.searchField}
                    />
                </div>
                <div className={classes.card_wrapper}>
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
                                                                        onChange={onClickCheckbox}
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
            <Col xs={8}>
                <div>
                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <div className={classes.slider_wrapper}>
                                <Typography id="range-slider" gutterBottom>
                                    Price range
                                </Typography>
                                <Slider
                                    value={price}
                                    min={1}
                                    max={50}
                                    name="price"
                                    valueLabelDisplay="auto"
                                    marks={marks}
                                    onChange={onChangeSlider}
                                    aria-labelledby="range-slider"
                                    getAriaValueText={valuetext}
                                    className={classes.slider}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div className={classes.ratingFilter_wrapper}>
                                <Typography id="range-slider" gutterBottom>
                                    Rating
                                </Typography>
                                <Rating
                                    name="size-large"
                                    defaultValue={2}
                                    size="large"
                                    precision={0.5}
                                    className={classes.ratingFilter}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <Form.Group controlId="locationFormSelect">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={location}
                                    onChange={onChangeLocation}>
                                    <option value={1}>Both</option>
                                    <option value={2}>Onsite</option>
                                    <option value={3}>Remote</option>
                                </Form.Control>
                            </Form.Group>
                        </Grid>
                        <Grid item xs={2}>
                            <Form.Group controlId="locationFormSelect">
                                <Form.Label>Language</Form.Label>
                                <Form.Control as="select">
                                    <option>German</option>
                                    <option>English</option>
                                    <option>Both</option>
                                </Form.Control>
                            </Form.Group>
                        </Grid>
                        <Grid item xs={2}>
                            <Form.Group controlId="locationFormSelect">
                                <Form.Label>Minimum Experience</Form.Label>
                                <Form.Control as="select">
                                    <option>0-50 </option>
                                    <option>50-100 </option>
                                    <option>100-200 </option>
                                    <option>200+</option>
                                </Form.Control>
                            </Form.Group>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography id="range-slider" gutterBottom>
                                Available Dates
                            </Typography>
                            <div className={classes.datePicker}>
                                <DatePicker
                                    placeholderText="  Select a date range"
                                    selected={startDate}
                                    onChange={onChangeDate}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                    wrapperClassName="datePicker"
                                />
                            </div>
                            <div className={classes.sortSessions}>
                                <Form.Group>
                                    <Form.Control as="select" value={sortValue} onChange={onSort}>
                                        <option value={-1} disabled>
                                            Sort By
                                        </option>
                                        <option value={1}>Price Ascending</option>
                                        <option value={2}>Price Descending</option>
                                        <option value={3}>New In</option>
                                        <option value={4}>Alphabetically</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <Card className={classes.sessionCard}>
                    {displayedSessions.map((item, _) => {
                        return (
                            <TutorialSessionComponent
                                tutorId={item.tutorId}
                                remote={item.remote}
                                onsite={item.onsite}
                                price={item.price}
                                description={item.description}
                                id={item._id}
                                name={item.course.name}></TutorialSessionComponent>
                        );
                    })}
                </Card>
            </Col>
        </Row>
    );
};

export default ShowTutorialSessions;
