const express = require('express');
const userRoutes = require('./user');
const teacherRoutes = require('./teacher');
const principalRoutes = require('./principal');
const masterRoutes = require('./master');
const studentRoutes = require('./student');

const routes = express.Router();

routes.use('/api/users', userRoutes);
routes.use('/api/teachers', teacherRoutes);
routes.use('/api/principals', principalRoutes);
routes.use('/api/masters', masterRoutes);
routes.use('/api/students', studentRoutes);

module.exports = routes;
