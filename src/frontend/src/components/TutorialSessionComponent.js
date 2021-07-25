import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card } from 'react-bootstrap/';
import Grid from '@material-ui/core/Grid';
import { Rating } from '@material-ui/lab/';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    component: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '2rem',
        paddingBottom: '1rem'
    },
    card: {
        height: '22rem',
        minHeight: '10rem',
        maxHeight: '22rem',
        paddingBottom: '2rem'
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
        //maxHeight: '100%',
        height: 'auto'
        // objectFit: 'contain'
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
    const [lastOnline, setLastOnline] = useState('');
    const [age, setAge] = useState('');
    const [rating, setRating] = useState(0);
    const [onsite, setOnsite] = useState(false);
    const [remote, setRemote] = useState(false);
    const [image, setImage] = useState(
        'https://icon-library.com/images/no-profile-picture-icon-female/no-profile-picture-icon-female-24.jpg'
    );
    const [experience, setExperience] = useState(0);
    const [languages, setLanguages] = useState([]);
    const [postalCode, setPostalCode] = useState('');
    const history = useHistory();

    function OnClickButton(e) {
        const sessionId = props.id;
        history.push({
            pathname: `/book-session/${sessionId}`
        });
    }

    useEffect(() => {
        setName(props.tutor.firstName);
        const differenceInHours = (new Date() - new Date(props.lastOnline)) / 36e5;
        let dateDifference = 0;

        if (differenceInHours > 24) {
            dateDifference = `${Math.floor(differenceInHours / 24)} days ago`;
        } else if (Math.floor(differenceInHours) === 0) {
            dateDifference = `${Math.floor(differenceInHours * 60)} minutes ago`;
        } else {
            dateDifference = `${Math.floor(differenceInHours)} hours ago`;
        }
        const ageDifference = new Date(new Date() - new Date(props.tutor.dateOfBirth));
        const age = `${Math.abs(ageDifference.getUTCFullYear() - 1970)} years old`;

        setLastOnline(dateDifference);
        setAge(age);
        setRating(props.tutor.averageRating);
        setExperience(props.tutor.experience);
        setLanguages(props.tutor.languages);
        setPostalCode(props.tutor.postalCode);
        if (props.tutor.image != undefined) {
            setImage(props.tutor.image.fileLink);
        }

        if (props.remote) {
            setRemote(true);
        }

        if (props.onsite) {
            setOnsite(true);
        }
    }, [onsite, remote, name, lastOnline, experience, rating]);

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
                                    <span>Book Now</span>
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
                                    src={image}
                                    alt="No image available"
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
                            Languages: {languages.join(', ')}
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
                            {`Experience: ${experience} sessions`}
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
                                value={rating}
                                size="large"
                                readOnly
                                precision={0.5}
                                className={classes.rating}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            Last Online: {lastOnline}
                        </Grid>
                        <Grid item xs={4}>
                            Postal Code: {postalCode}
                        </Grid>
                    </Grid>
                </div>
            </Card>
        </div>
    );
}

export default TutorialSessionComponent;
