const express = require('express');

const cors = require('cors');

const path = require('path');

require('./models/database');

const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./swagger/swagger');

const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', taskRoutes);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

module.exports = app;