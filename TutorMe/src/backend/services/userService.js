const userRepository = require('../repositories/userRepository');
const ratingHelper = require('../utils/ratingHelper');

const findAll = (req, res) => {
    userRepository.findAll()
        .then(users => res.json(users))
        .catch(error =>
            res.status(404).json({
                error: 'No available Universities found',
                message: error.message
            })
        );
};

const getUserById = async (req, res) => {
    userRepository.findByIdWithImage(req.params.id)
        .then(tutor => {
            const data = {
                name: tutor[0].firstName,
                lastName: tutor[0].lastName,
                gender: tutor[0].gender,
                dateOfBirth: tutor[0].dateOfBirth,
                lastOnline: tutor[0].lastOnline,
                ratings: tutor[0].ratings,
                image: tutor[0].image,
                university: tutor[0].university,
                program: tutor[0].program,
                semester: tutor[0].semester,
                role: tutor[0].role,
                email: tutor[0].email,
                languages: tutor[0].languages,
                city: tutor[0].city,
                postalCode: tutor[0].postalCode,
                adress: tutor[0].adress
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

const updateUserById = (req, res) => {
    userRepository.updateById(req.params.id, req.body)
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            errorCallback(error);
        });
};

const getUserSessionsById = async (req, res) => {
    userRepository.findByIdWithBookings(req.params.id)
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

const getExperienceRatingByUserId = async (req, res) => {
    userRepository.findByIdWithBookedOfferings(req.params.id)
        .then(tutor => {
            const { experience, averageRating } = ratingHelper.computeExperienceAndRating(tutor[0].bookedOfferings);
            res.status(200).json({
                experience: experience,
                averageRating: averageRating
            });
        })
        .catch(error => {
            res.status(404).json({
                error: `No booked offerings for user: ${req.params.id}`,
                message: error.message
            });
        });
};

module.exports = {
    findAll,
    getUserById,
    updateUserById,
    getUserSessionsById,
    getExperienceRatingByUserId
};
