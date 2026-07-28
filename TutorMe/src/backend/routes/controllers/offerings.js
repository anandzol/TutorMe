const offeringService = require('../../services/offeringService');

/**
 * API Controller for getting all offerings by session id
 * @param {Object} req req.params.id contains id of the university
 * @param {Object} res response made to the client
 */
const getBySessionId = (req, res) => {
    offeringService.findBySessionId(req.params.sessionid)
        .then(offers => res.json(offers))
        .catch(error =>
            res.status(404).json({
                error: 'No available slots found',
                message: error.message
            })
        );
};

const create = (req, res) => {
    offeringService.create(req.body)
        .then(response => {
            res.json({ message: 'Session created successfully' });
        })
        .catch(error => {
            res.status(400).json({ message: error });
        });
};

module.exports = {
    getBySessionId,
    create
};
