const express = require('express');

const OrganizationController = require('./controllers/OrganizationController');
const UserController = require('./controllers/UserController');
const EvolutionRecordController = require('./controllers/EvolutionRecordController');
const ProfessionalAttendanceController = require('./controllers/ProfessionalAttendanceController');
const SpecialitiesController = require('./controllers/SpecialitiesController');

const routes = express.Router();

// routes.get('/users', UserController.index);
// routes.post('/users', UserController.store);

routes.get('/organizations', OrganizationController.index);
routes.post('/organizations', OrganizationController.store);

routes.get('/organizations/:organization_id/users', UserController.index);
routes.post('/organizations/:organization_id/users', UserController.store);

routes.get('/users/:user_id/specialities', SpecialitiesController.index);
routes.get('/specialities', SpecialitiesController.findAll);
routes.post('/users/:user_id/specialities', SpecialitiesController.store);

routes.get('/users/:user_id/evolutionRecords', EvolutionRecordController.index);
routes.get('/evolutionRecords', EvolutionRecordController.findAll);
routes.post('/users/:user_id/evolutionRecords', EvolutionRecordController.store);

routes.get('/users/:user_id/professionalAttendances', ProfessionalAttendanceController.index);
routes.get('/professionalAttendances', ProfessionalAttendanceController.findAll);
routes.post('/users/:user_id/professionalAttendances', ProfessionalAttendanceController.store);

module.exports = routes;

// app.get('/users', (req, res) => {}); //Listar todos
// app.post('/users', (req, res) => {}); // Criar
// app.get('/users/:id', (req, res) => {}); //Buscar
// app.put('/users/:id', (req, res) => {}); //Editar
// app.delete('/users/:id', (req, res) => {}); //Deletar