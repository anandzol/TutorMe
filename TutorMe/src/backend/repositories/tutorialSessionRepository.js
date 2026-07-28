const TutorialSession = require('../models/tutorialSession');
const User = require('../models/user');

const findByFilter = (filter) => {
    return TutorialSession.find(filter).populate('course').sort({ updatedAt: -1 });
};

const findVerifiedWithTutorDetails = (universityId) => {
    return TutorialSession.find({ university: universityId, status: 'verified' }).populate({
        path: 'course',
        model: 'course'
    }).populate({
        path: 'tutorId',
        populate: 'bookedOfferings image',
        select: 'averageRating experience firstName lastOnline dateOfBirth languages postalCode'
    }).sort({ updatedAt: -1 });
};

const findByIdWithCourse = (id) => {
    return TutorialSession.findOne({ _id: id }).populate('course');
};

const findAllPendingDocuments = () => {
    return TutorialSession.find({ status: 'pending' }).populate([
        { path: 'course' },
        { path: 'tutorId' },
        { path: 'cv' },
        { path: 'transcript' },
        { path: 'university' },
        { path: 'faculty' }
    ]).sort({ updatedAt: 1 });
};

const findByTutorId = (id) => {
    return TutorialSession.find({ tutorId: id }).populate({ path: 'course university' }).sort({ createdAt: -1 });
};

const updateStatusByDocumentId = (documentId, status) => {
    return TutorialSession.updateOne({ cv: documentId }, { $set: { status } });
};

const deleteById = (id) => {
    return TutorialSession.findOneAndDelete({ _id: id });
};

const create = (data) => {
    return TutorialSession.create(data);
};

const updateById = (id, data) => {
    return TutorialSession.findByIdAndUpdate(id, data);
};

const findAllWithCourse = () => {
    return TutorialSession.find().populate('course');
};

module.exports = {
    findByFilter,
    findVerifiedWithTutorDetails,
    findByIdWithCourse,
    findAllPendingDocuments,
    findByTutorId,
    updateStatusByDocumentId,
    deleteById,
    create,
    updateById,
    findAllWithCourse
};
