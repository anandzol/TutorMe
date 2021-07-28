const Offerings = require('../../models/offerings');

/**
 * API Controller for getting all offerings by session id
 * @param {Object} req req.params.id contains id of the university
 * @param {Object} res response made to the client
 */
const getBySessionId = (req, res) => {
    Offerings.find({ sessionId: req.params.sessionid })
        .sort({ updatedAt: -1 })
        .then(offers => res.json(offers))
        .catch(error =>
            res.status(404).json({
                error: 'No available slots found',
                message: error.message
            })
        );
};

module.exports = {
    getBySessionId
};
