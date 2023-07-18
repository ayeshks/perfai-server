const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const userRoutes = require('./routes/api/user');
const clubOwnerRoutes = require('./routes/api/clubowner');
const clubRoutes = require('./routes/api/club');
const clubdataRoutes = require('./routes/api/clubdata');

app.use('/api/user', userRoutes);
app.use('/api/clubowner', clubOwnerRoutes);
app.use('/api/club', clubRoutes);
app.use('/api/clubdata', clubdataRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));



