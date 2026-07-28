const bookingService = require('../../services/bookingService');
const bookingRepository = require('../../repositories/bookingRepository');

const getAll = (req, res) => {
    bookingRepository.findAll()
        .then(bookings => res.json(bookings))
        .catch(error =>
            res.status(404).json({ message: 'No available Bookings found' })
        );
};

const getById = (req, res) => {
    bookingRepository.findById(req.params.id)
        .then(response => res.json(response))
        .catch(error => res.status(404).json({ message: 'No booking found' }));
};

const bookSession = (req, res) => {
    bookingService.bookSession(req, res);
};

const rateBooking = (req, res) => {
    bookingService.rateBooking(req, res);
};

const deleteBookingById = (req, res) => {
    bookingService.deleteBooking(req, res);
};

const getBookingsByStudentId = (req, res) => {
    bookingService.getBookingsByStudent(req, res);
};

const getBookingsByTutorId = (req, res) => {
    bookingService.getBookingsByTutor(req, res);
};

module.exports = {
    getAll,
    getById,
    bookSession,
    getBookingsByStudentId,
    rateBooking,
    deleteBookingById,
    getBookingsByTutorId
};
