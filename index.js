const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes/index'); 
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3055;
const URL = process.env.URL || 'http://localhost:';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error starting server:", err);
    } else {
        console.log(`Server is running on: ${URL}${PORT}`);
    }
});
