// Configuration variables
const port = process.env.PORT || '8082';
const JwtSecret = process.env.JWT_SECRET || 'very secret secret';
const mongoURI =
    process.env.MONGODB_URI ||
    'mongodb://tutorme:tutorme123@localhost:27017/tutorme?authSource=admin';

module.exports = {
    port,
    mongoURI,
    JwtSecret
};
