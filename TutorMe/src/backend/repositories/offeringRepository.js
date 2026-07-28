const Offerings = require('../models/offerings');

const findBySessionId = (sessionId) => {
    return Offerings.find({ sessionId }).sort({ updatedAt: -1 });
};

const create = (data) => {
    return Offerings.create(data);
};

module.exports = {
    findBySessionId,
    create
};
