// routes/controllers/user.js

const User = require('../../models/user');
const Booking = require('../../models/booking');
/**
 * API Controller for getting all the necessary information displayed in a tutorial session
 * omits all private information (e.g. lastName, password Hash, Email)
 * @param {Object} req
 * @param {Object} res
 */
const getUserById = async (req, res) => {
    // console.log(req)
    User.find({ _id: req.params.id })
        .then(tutor => {
            // console.log(tutor)
            const data = {
                name: tutor[0].firstName,
                lastName: tutor[0].lastName,
                gender: tutor[0].gender,
                dateOfBirth: tutor[0].dateOfBirth,
                lastOnline: tutor[0].lastOnline,
                ratings: tutor[0].ratings,
                university: tutor[0].university,
                program: tutor[0].program,
                semester: tutor[0].semester,
                role: tutor[0].role,
                email: tutor[0].email
            };
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(404).json({
                error: 'User not found',
                message: error.message
            });
        });
};

/**
 * API Controller for editing user info
 * @param {Object} req
 * @param {Object} res
 */
const updateUserById = (req, res) => {
    // console.log("req", req.params.id)
    User.findByIdAndUpdate(req.params.id, req.body)
    .then(response => {
             res.json(response)
             console.log(response)
             console.log(`Updated user ${req.params.id} successfully`)
        })
        .catch(error => {
            console.log(error)
            errorCallback(error);
        }
    )}
/**
 * API Controller for getting all booked tutorial sessions of a user
 * @param {Object} req
 * @param {Object} res
 */
const getUserSessionsById = async (req, res) => {
    User.find({ _id: req.params.id })
        .populate('bookings')
        .then(user => {
            const data = {
                bookings: user[0].bookings
            };
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(404).json({
                error: `User with Id ${req.params.id} not found`,
                message: error.message
            });
        });
};

/**
 * API Controller for getting all booked offerings of a tutor
 * @param {Object} req
 * @param {Object} res
 */
const getExperienceRatingByUserId = async (req, res) => {
    User.find({ _id: req.params.id })
        .populate('bookedOfferings')
        .then(tutor => {
            const currentDate = new Date();
            const previousOfferedBookings = tutor[0].bookedOfferings.filter(
                offering => new Date(offering.startDate) < currentDate
            );
            const experience = previousOfferedBookings.length;

            const ratedOfferings = previousOfferedBookings
                .filter(offering => offering.rating > 0)
                .map(item => item.rating);

            const averageRating =
                ratedOfferings.reduce((acc, val) => acc + val, 0) /
                ratedOfferings.length;
            const averageRatingRounded = Math.round(averageRating * 100) / 100;

            const data = {
                rating: averageRatingRounded,
                experience: experience
            };

            res.status(200).json(data);
        })
        .catch(error => {
            res.status(404).json({
                error: 'User not found',
                message: error.message
            });
        });
};
module.exports = {
    getUserById,
    getUserSessionsById,
    getExperienceRatingByUserId,
    updateUserById
};
