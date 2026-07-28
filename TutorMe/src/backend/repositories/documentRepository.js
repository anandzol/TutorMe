const Document = require('../models/document');

const findAllSorted = (callback) => {
    return Document.find({}, null, { sort: { createdAt: -1 } }, callback);
};

const findById = (id, callback) => {
    return Document.findById(id, callback);
};

const findByIdAndRemove = (id, callback) => {
    return Document.findByIdAndRemove(id, callback);
};

const saveNew = (data, callback) => {
    const newDoc = new Document(data);
    return newDoc.save(callback);
};

module.exports = {
    findAllSorted,
    findById,
    findByIdAndRemove,
    saveNew
};
