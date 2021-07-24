import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap/';
import SearchField from 'react-search-field';
import { TreeView, TreeItem, Rating } from '@material-ui/lab/';
import { makeStyles } from '@material-ui/styles';
import { getUniversityById } from '../services/UniversityService';
import { getAllVerifiedSessionsByUniversity } from '../services/SessionService';
import { FormControlLabel, Checkbox } from '@material-ui/core/';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Slider, Grid, Typography } from '@material-ui/core/';
import DatePicker from 'react-datepicker';
import TutorialSessionComponent from './TutorialSessionComponent';
import Select from 'react-select';
import Pagination from '@material-ui/lab/Pagination';

import './styles/styles.css';

const useStyles = makeStyles(theme => ({
    component: {
        display: 'flex',
        height: '100%',
        width: '100%',
        position: 'relative',
        paddingTop: '3rem',
        paddingLeft: '1rem',
        marginRight: '0px',
        margin: '0'
    },
    treepane: {
        paddingTop: '1rem',
        paddingLeft: '1rem'
    },
    searchField: {
        height: '4.5rem',
        width: '100%',
        paddingLeft: '1rem',
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
        fontSize: '17px',
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
        width: '100%',
        paddingTop: '1rem',
        paddingLeft: '1rem',
        paddingBottom: '1rem',
        height: '50rem',
        minHeight: '15rem',
        maxHeight: '60rem',
        overflowY: 'auto',
        overflowX: 'hidden'
    },
    card_wrapper: {
        paddingLeft: '1rem'
    },
    slider: {
        width: '100%',
        paddingTop: '1rem'
    },
    slider_wrapper: {
        paddingLeft: '2rem'
    },
    ratingFilter: {
        paddingTop: '0.2rem'
    },
    ratingFilter_wrapper: {
        width: '7rem',
        paddingLeft: '1rem'
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
        minHeight: '50rem',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '110%'
    },
    filterBar: {
        width: '105%'
    },
    breadCrumb: {
        paddingLeft: '0.5rem',
        width: '85%',
        paddingBottom: '0.5rem',
        fontSize: 'large'
    },
    breadCrumbItem: {
        backgroundColor: 'white'
    },
    paginationComponent: {
        paddingTop: '1rem',
        position: 'absolute'
    },
    dateFilter: {
        width: '13rem',
        paddingLeft: '1rem'
    },
    sortSessionWrapper: {
        paddingLeft: '1rem',
        width: '13rem'
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
const locationFilter = [
    { value: 1, label: 'Both' },
    { value: 2, label: 'Onsite' },
    { value: 3, label: 'Remote' }
];
const languages = [
    { value: 'German', label: 'German' },
    { value: 'English', label: 'English' },
    { value: 'French', label: 'French' }
];
const experienceFilter = [
    { value: 1, label: '0-50' },
    { value: 2, label: '50-100' },
    { value: 3, label: '100-200' },
    { value: 4, label: '200+' }
];
const sortingValues = [
    { value: 1, label: 'New In' },
    { value: 2, label: 'Price Ascending' },
    { value: 3, label: 'Price Descending' },
    { value: 4, label: 'Alphabetically' }
];

const ShowTutorialSessions = () => {
    // All sessions are all sessions which are queried based on university
    const [allSessions, setAllSessions] = useState([]);

    // Displayed sessions are sessions which are displayed taking pagination into account
    const [displayedSessions, setDisplayedSessions] = useState([]);

    // Filtered sessions are sessions based on all filter criteria (price, rating, course, etc.)
    const [filteredSessions, setFilteredSessions] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [location, setLocation] = useState(1);
    const [language, setLanguage] = useState([]);
    const [experience, setExperience] = useState(0);
    const [price, setPriceFilter] = useState([1, 50]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [sortValue, setSortValue] = useState(-1);
    const [initialRender, setInitialRender] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [rating, setRating] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [activePage, setActivePage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(1);

    // For development purposes, will need to be either fetched dynamically by user/ passed on by props of hoc
    const [university, setUniversity] = useState('60bff011a5e1000beeddb38e');
    const [universityName, setUniversityName] = useState('');
    useEffect(async () => {
        setLoading(true);

        // Prevent api call everytime a value changes
        if (initialRender) {
            getUniversityById(
                university,
                response => {
                    setUniversityName(response.data.name);
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
            await getAllVerifiedSessionsByUniversity(
                university,
                response => {
                    // Initially display all sessions of the university
                    setAllSessions(response.data);
                    setFilteredSessions(response.data);
                    setDisplayedSessions(response.data.slice(0, 2));
                    setNumberOfPages(Math.ceil(response.data.length / 2));
                },
                error => {
                    console.error(error);
                }
            );
            setInitialRender(false);
        }
        filterSessions();
        setLoading(false);
    }, [location, price, experience, language, rating, filteredCourses, searchKeyword, activePage]);

    const onSearch = e => {
        setSearchKeyword(e);
    };

    const onChangeLocation = e => {
        setLocation(e.value);
    };

    const onChangeSlider = (e, newValue) => {
        setPriceFilter(newValue);
    };

    const filterSessions = () => {
        let filteredSessions = [];
        // Filter by selected courses
        // If no checkbox is selected, we display all courses
        if (filteredCourses.length === 0) {
            filteredSessions = allSessions;
        } else {
            filteredSessions = allSessions.filter(session =>
                filteredCourses.includes(session.course._id)
            );
        }

        // Filter by minimum price range
        const minimumPrice = price[0];
        const maximumPrice = price[1];
        filteredSessions = filteredSessions.filter(
            session => session.price >= minimumPrice && session.price <= maximumPrice
        );

        // Filter by location
        switch (location) {
            case 1:
                filteredSessions = filteredSessions;
                break;

            case 2:
                filteredSessions = filteredSessions.filter(session => session.onsite);

                break;
            case 3:
                filteredSessions = filteredSessions.filter(session => session.remote);
                break;
            default:
                filteredSessions = filteredSessions;
        }

        // Filter by rating
        filteredSessions = filteredSessions.filter(
            session => session.tutorId.averageRating >= rating
        );

        // Filter by minimum experience
        switch (experience) {
            case 1:
                filteredSessions = filteredSessions.filter(
                    session => session.tutorId.experience > 0 && session.tutorId.experience < 50
                );
                break;
            case 2:
                filteredSessions = filteredSessions.filter(
                    session => session.tutorId.experience > 50 && session.tutorId.experience < 100
                );
                break;
            case 3:
                filteredSessions = filteredSessions.filter(
                    session => session.tutorId.experience > 100 && session.tutorId.experience < 200
                );
                break;
            case 4:
                filteredSessions = filteredSessions.filter(
                    session => session.tutorId.experience > 200
                );
                break;
            default:
                filteredSessions = filteredSessions;
                break;
        }

        // Filter by language
        if (language.length !== 0) {
            filteredSessions = filteredSessions.filter(session =>
                session.tutorId.languages.some(lang => language.includes(lang))
            );
        }

        //Filter by search keyword
        filteredSessions = filteredSessions.filter(
            session =>
                session.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                session.course.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                session.tutorId.firstName.toLowerCase().includes(searchKeyword.toLowerCase())
        );

        let allFilteredSessions = filteredSessions;

        // We display 2 offerings per page
        setNumberOfPages(Math.ceil(allFilteredSessions.length / 2));
        if (sortValue !== -1) {
            switch (sortValue) {
                case 1:
                    filteredSessions = filteredSessions.sort(
                        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );
                    break;
                case 2:
                    filteredSessions = filteredSessions.sort((a, b) => a.price - b.price);

                    break;
                case 3:
                    filteredSessions = filteredSessions.sort((a, b) => b.price - a.price);
                    break;
                case 4:
                    filteredSessions = filteredSessions.sort((a, b) =>
                        a.course.name.localeCompare(b.course.name)
                    );
                    break;
                default:
                    console.error('no available sort option');
            }
        }
        setFilteredSessions(filteredSessions);
        const startIndex = activePage * 2 - 2;
        const endIndex = activePage * 2;
        let clonedArray = filteredSessions.slice();
        clonedArray = clonedArray.slice(startIndex, endIndex);
        setDisplayedSessions(clonedArray);
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

        setFilteredCourses(filteredCourses);
    };

    const onSort = e => {
        setSortValue(e.value);
        setActivePage(1);
        let sortedSessions = filteredSessions;
        switch (e.value) {
            case 1:
                sortedSessions = filteredSessions.sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                break;
            case 2:
                sortedSessions = filteredSessions.sort((a, b) => a.price - b.price);
                break;
            case 3:
                sortedSessions = filteredSessions.sort((a, b) => b.price - a.price);

                break;
            case 4:
                sortedSessions = filteredSessions.sort((a, b) =>
                    a.course.name.localeCompare(b.course.name)
                );
                break;
            default:
                console.error('no available sort option');
        }

        setNumberOfPages(Math.ceil(sortedSessions.length / 2));
        setDisplayedSessions(sortedSessions.slice(0, 2));
    };

    const onFilterRating = e => {
        setRating(e.target.value);
    };

    const onChangeDate = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const onChangeExperience = e => {
        setExperience(e.value);
    };

    const onChangeLanguages = e => {
        setLanguage(e.map(language => language.value));
    };

    const handlePageChange = (e, value) => {
        setActivePage(value);
    };

    function renderTutorialSessionComponents() {
        if (!isLoading) {
            return (
                <div>
                    {displayedSessions.map(item => {
                        return (
                            <div>
                                <TutorialSessionComponent
                                    key={item._id}
                                    name={item.tutorId.firstName}
                                    lastOnline={item.tutorId.lastOnline}
                                    tutor={item.tutorId}
                                    remote={item.remote}
                                    onsite={item.onsite}
                                    price={item.price}
                                    description={item.description}
                                    id={item._id}
                                    name={item.course.name}></TutorialSessionComponent>
                            </div>
                        );
                    })}
                </div>
            );
        } else {
            return <div></div>;
        }
    }

    const classes = useStyles();
    return (
        <Row className={classes.component}>
            <Col xs={3} className={`col`}>
                <div className={classes.breadCrumb}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="http://localhost:3000/home">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>{universityName}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
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
                <div className={classes.filterBar}>
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
                                    defaultValue={0}
                                    value={rating}
                                    size="large"
                                    precision={0.5}
                                    onChange={onFilterRating}
                                    className={classes.ratingFilter}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div className={classes.selectWrapper}>
                                <Form.Group controlId="locationFormSelect">
                                    <Form.Label>Location</Form.Label>
                                    <Select
                                        options={locationFilter}
                                        placeholder="Location"
                                        onChange={onChangeLocation}></Select>
                                </Form.Group>
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div>
                                <Form.Group controlId="locationFormSelect">
                                    <Form.Label>Language</Form.Label>
                                    <Select
                                        isMulti
                                        options={languages}
                                        placeholder="Language"
                                        onChange={onChangeLanguages}
                                    />
                                </Form.Group>
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div>
                                <Form.Group controlId="locationFormSelect">
                                    <Form.Label>Minimum Experience</Form.Label>
                                    <Select
                                        options={experienceFilter}
                                        placeholder="Sessions"
                                        onChange={onChangeExperience}></Select>
                                </Form.Group>
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div className={classes.dateFilter}>
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
                            </div>
                            <div className={classes.sortSessionWrapper}>
                                <div className={classes.sortSessions}>
                                    <Form.Group>
                                        <Select
                                            options={sortingValues}
                                            onChange={onSort}
                                            defaultValue={sortingValues[0]}></Select>
                                    </Form.Group>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <Card className={classes.sessionCard}>{renderTutorialSessionComponents()}</Card>
                    <div className={classes.paginationComponent}>
                        <Pagination
                            count={numberOfPages}
                            page={activePage}
                            onChange={handlePageChange}
                            color="primary"
                            variant="outlined"
                            size="large"></Pagination>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default ShowTutorialSessions;
