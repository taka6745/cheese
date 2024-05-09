const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swaggerOptions');
const cheeseRoutes = require('../routes/cheeseRoutes');
const path = require('path'); // Add this line to import the 'path' module

const app = express();


app.use('/img', express.static(path.resolve(__dirname, '..', 'img')));


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', cheeseRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = app;
