const User = require('../models/user');

const findAll = () => {
    return User.find();
};

const findByEmail = (email) => {
    return User.findOne({ email });
};

const create = (data) => {
    return User.create(data);
};

const updateById = (id, data) => {
    return User.findByIdAndUpdate(id, data, { new: true });
};

const findByIdWithImage = (id) => {
    return User.find({ _id: id }).populate('image', { _id: 1, name: 1, fileLink: 1 });
};

const findByIdWithBookings = (id) => {
    return User.find({ _id: id }).populate('bookings');
};

const findByIdWithBookedOfferings = (id) => {
    return User.find({ _id: id }).populate('bookedOfferings');
};

const findByIdWithBookingsAndOfferings = (id) => {
    return User.findOne({ _id: id }).populate({
        path: 'bookings',
        populate: {
            path: 'tutorId'
        }
    }).populate({
        path: 'bookedOfferings',
        populate: {
            path: 'studentId'
        }
    });
};

const findOneByIdWithBookedOfferings = (id) => {
    return User.findOne({ _id: id }).populate('bookedOfferings');
};

module.exports = {
    findAll,
    findByEmail,
    create,
    updateById,
    findByIdWithImage,
    findByIdWithBookings,
    findByIdWithBookedOfferings,
    findByIdWithBookingsAndOfferings,
    findOneByIdWithBookedOfferings
};
