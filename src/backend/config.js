// Configuration variables
const port = process.env.PORT || '8082';
const JwtSecret = process.env.JWT_SECRET || 'very secret secret';
const mongoURI =
    process.env.MONGODB_URI ||
    'mongodb+srv://root:tutorME2021@cluster0.i7ajg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

module.exports = {
    port,
    mongoURI,
    JwtSecret
};
