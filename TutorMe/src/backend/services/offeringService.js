const offeringRepository = require('../repositories/offeringRepository');

const findBySessionId = (sessionId) => {
    return offeringRepository.findBySessionId(sessionId);
};

const create = (data) => {
    return offeringRepository.create(data);
};

module.exports = {
    findBySessionId,
    create
};
