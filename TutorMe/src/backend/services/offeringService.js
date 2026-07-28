const offeringRepository = require('../repositories/offeringRepository');
const TutorialSession = require('../models/tutorialSession');

const findBySessionId = (sessionId) => {
    return offeringRepository.findBySessionId(sessionId)
        .then(offerings => {
            // If no offerings found, get availability from tutorialSession
            if (!offerings || offerings.length === 0) {
                return TutorialSession.findById(sessionId).then(session => {
                    if (session && session.date && session.date.length > 0) {
                        return session.date;
                    }
                    return [];
                });
            }
            return offerings;
        });
};

const create = (data) => {
    return offeringRepository.create(data);
};

module.exports = {
    findBySessionId,
    create
};
