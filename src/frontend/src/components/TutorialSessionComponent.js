import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card } from 'react-bootstrap/';
import Grid from '@material-ui/core/Grid';
import { getTutorById } from '../services/TutorService';
import { Rating } from '@material-ui/lab/';
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
    component: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '1rem',
        paddingBottom: '1rem'
    },
    card: {
        height: '22rem',
        minHeight: '8rem',
        maxHeight: '22rem',
        paddingBottom: '1rem'
    },
    header_wrapper: {
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem',
        paddingLeft: '0.2rem',
        paddingRight: '0.2rem',
        backgroundColor: '#85bdee'
    },
    header: {
        paddingTop: '0.5rem',
        paddingLeft: '1rem'
    },
    button_wrapper: {
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem'
    },
    button: {
        height: '5rem',
        width: '10rem',
        minWidth: '2rem',
        maxWidth: '10rem',
        minHeight: '1rem',
        maxHeight: '2.5rem',
        backgroundColor: '#c6ddb4'
    },
    description_wrapper: {
        height: '8rem',
        maxHeight: '10rem',
        paddingLeft: '1rem',
        paddingRight: '2rem'
    },
    description: {
        height: '8rem',
        minHeight: '8rem',
        paddingTop: '1rem',
        overflowY: 'auto',
        overflowX: 'hidden',
        fontStyle: 'oblique'
    },
    image_wrapper: {
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingRight: '0.5rem'
    },
    image: {
        right: '20px',
        paddingRight: '61px',
        maxWidth: '100%',
        maxHeight: '100%',
        height: 'auto'
    },
    gridImage: {
        backgroundColor: 'white',
        zIndex: 9999,
        height: '16rem',
        width: '16rem'
    },
    row_wrapper: {
        height: '1rem',
        minHeight: '1rem',
        maxHeight: '1rem',
        paddingLeft: '1rem'
    }
}));

function TutorialSessionComponent(props) {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [lastOnline, setLastOnline] = useState('');
    const [age, setAge] = useState('');
    const [ratings, setRatings] = useState([]);
    const [location, setLocation] = useState([]);
    const [onsite, setOnsite] = useState(false);
    const [remote, setRemote] = useState(false);

    const history = useHistory();

    function OnClickButton(e) {
        const sessionId = props.id;
        history.push({
            pathname: `/book-session/${sessionId}`
        });
    }

    useEffect(() => {
        getTutorById(
            props.tutorId,
            response => {
                const tutor = response.data;
                setName(tutor.name);
                setGender(tutor.gender);
                const differenceInHours = (new Date() - new Date(tutor.lastOnline)) / 36e5;
                let dateDifference = 0;

                if (differenceInHours > 24) {
                    dateDifference = `${Math.floor(differenceInHours / 24)} days ago`;
                } else if (Math.floor(differenceInHours) === 0) {
                    dateDifference = `${Math.floor(differenceInHours * 60)} minutes ago`;
                } else {
                    dateDifference = `${Math.floor(differenceInHours)} hours ago`;
                }
                const ageDifference = new Date(new Date() - new Date(tutor.dateOfBirth));
                const age = `${Math.abs(ageDifference.getUTCFullYear() - 1970)} years old`;

                setLastOnline(dateDifference);
                setAge(age);
            },
            error => {
                console.error(error);
            }
        );
        if (props.remote) {
            setRemote(true);
        }

        if (props.onsite) {
            setOnsite(true);
        }
    }, [onsite, remote]);

    const onClickTest = e => {
        console.log(props);
    };
    const classes = useStyles();

    return (
        <div className={classes.component}>
            <Card className={classes.card}>
                <div className={classes.header_wrapper}>
                    <Grid container spacing={1} className={classes.container}>
                        <Grid item xs={10}>
                            <div className={classes.header}>
                                <h4>{props.name}</h4>
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div className={classes.button_wrapper}>
                                <button className={classes.button} onClick={OnClickButton}>
                                    Book Now
                                </button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.description_wrapper}>
                    <Grid container spacing={1}>
                        <Grid item xs={10}>
                            <div className={classes.description}>{props.description}</div>
                        </Grid>
                        <Grid item xs={2}>
                            <div className={classes.gridImage}>
                                <img
                                    className={classes.image}
                                    src="https://icon-library.com/images/no-profile-picture-icon-female/no-profile-picture-icon-female-24.jpg"
                                    alt="new"
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <hr />
                <div className={classes.row_wrapper}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            Price: {`${props.price}€/h`}
                        </Grid>
                        <Grid item xs={4}>
                            Languages: English, German
                        </Grid>
                        <Grid item xs={4}>
                            Name: {name}
                        </Grid>
                    </Grid>
                </div>
                <hr />
                <div className={classes.row_wrapper}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            Experience: 121 Sessions
                        </Grid>
                        <Grid item xs={4}>
                            Location:
                            {remote ? ' Remote' : ''}
                            {onsite ? ' Onsite' : ''}
                        </Grid>
                        <Grid item xs={4}>
                            Age: {age}
                        </Grid>
                    </Grid>
                </div>
                <hr />
                <div className={classes.row_wrapper}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Rating
                                name="size-large"
                                defaultValue={4}
                                size="large"
                                className={classes.rating}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            Last Online: {lastOnline}
                        </Grid>
                        <Grid item xs={4}>
                            Postal Code: 85748
                        </Grid>
                    </Grid>
                </div>
            </Card>
        </div>
    );
}

export default TutorialSessionComponent;
