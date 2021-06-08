// app.js
// Entry point of the backend

const express = require('express');
const connectDB = require('./db');
var cors = require('cors');

const app = express();

const courses = require('./routes/api/course');
const users = require('./routes/api/user');
const universities = require('./routes/api/university');

connectDB();

// Cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('test123'));

// Init API routes
app.use('/api/course', courses);
app.use('/api/user', users);
app.use('/api/university', universities);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
