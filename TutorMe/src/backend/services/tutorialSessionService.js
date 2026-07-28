const tutorialSessionRepository = require('../repositories/tutorialSessionRepository');
const offeringRepository = require('../repositories/offeringRepository');
const userRepository = require('../repositories/userRepository');
const offeringsHelper = require('../utils/offeringsHelper');

const findByFilter = (filter) => {
    return tutorialSessionRepository.findByFilter(filter);
};

const getAllVerifiedByUniversityId = (universityId) => {
    return tutorialSessionRepository.findVerifiedWithTutorDetails(universityId).then(sessions => {
        sessions.forEach(session => {
            userRepository.findByIdWithBookedOfferings(session.tutorId._id)
                .then(tutor => {
                    session['averageRating'] = tutor.averageRating;
                    session['experience'] = tutor.experience;
                });
        });
        return sessions;
    });
};

const findByIdWithCourse = (id) => {
    return tutorialSessionRepository.findByIdWithCourse(id);
};

const findAllPendingDocuments = () => {
    return tutorialSessionRepository.findAllPendingDocuments();
};

const findByTutorId = (id) => {
    return tutorialSessionRepository.findByTutorId(id);
};

const updateStatusByDocumentId = (documentId, status) => {
    return tutorialSessionRepository.updateStatusByDocumentId(documentId, status);
};

const deleteById = (id) => {
    return tutorialSessionRepository.deleteById(id);
};

const createSession = (data) => {
    return tutorialSessionRepository.create(data).then(response => {
        const availableSlots = offeringsHelper.extractTimeSlots(
            response.noEarlyThreshold,
            response.noLaterThreshold
        );
        response.date.forEach(date => {
            const offeringData = {
                sessionId: response._id,
                offeringDate: date,
                dateString: new Date(date).getFullYear() + '-' + (new Date(date).getMonth() + 1) + '-' + new Date(date).getDate(),
                availableSlots: availableSlots
            };
            offeringRepository.create(offeringData);
        });
        return response;
    });
};

const updateById = (id, data) => {
    return tutorialSessionRepository.updateById(id, data);
};

const findAllWithCourse = () => {
    return tutorialSessionRepository.findAllWithCourse();
};

const getByUniversityId = (universityId) => {
    return tutorialSessionRepository.findByFilter({ university: universityId });
};

const getAllPending = () => {
    return tutorialSessionRepository.findByFilter({ status: 'pending' });
};

const getAllPendingByUniversityId = (universityId) => {
    return tutorialSessionRepository.findByFilter({ university: universityId, status: 'pending' });
};

const getAllRejectedByUniversityId = (universityId) => {
    return tutorialSessionRepository.findByFilter({ university: universityId, status: 'pending' });
};

module.exports = {
    findByFilter,
    getAllVerifiedByUniversityId,
    findByIdWithCourse,
    findAllPendingDocuments,
    findByTutorId,
    updateStatusByDocumentId,
    deleteById,
    createSession,
    updateById,
    findAllWithCourse,
    getByUniversityId,
    getAllPending,
    getAllPendingByUniversityId,
    getAllRejectedByUniversityId
};
