const Booking = require('../models/booking');
const User = require('../models/user');
const Offering = require('../models/offerings');

const create = (data) => {
    return Booking.create(data);
};

const findAll = () => {
    return Booking.find();
};

const findById = (id) => {
    return Booking.findById(id);
};

const updateRating = (id, rating) => {
    return Booking.updateOne({ _id: id }, { rating });
};

const pushRatingArray = (id, ratingObject) => {
    return Booking.findByIdAndUpdate(id, { $push: { rating: ratingObject } });
};

const deleteById = (id) => {
    return Booking.findOneAndDelete({ _id: id });
};

const findUser = (id) => {
    return User.findOne({ _id: id });
};

const findOffering = (filter) => {
    return Offering.findOne(filter).populate('booking').sort({ updatedAt: -1 });
};

module.exports = {
    create,
    findAll,
    findById,
    updateRating,
    pushRatingArray,
    deleteById,
    findUser,
    findOffering
};
