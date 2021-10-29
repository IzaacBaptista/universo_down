const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Organization = require('../models/Organization');
const EvolutionRecord = require('../models/EvolutionRecord');
const ProfessionalAttendance = require('../models/ProfessionalAttendance');
const Specialities = require('../models/Specialities');
const Calendar = require('../models/Calendar');
const Assisted = require('../models/Assisted');
const Related = require('../models/Related');
const SchoolRequest = require('../models/SchoolRequest');
const TransportRequest = require('../models/TransportRequest');


const connection = new Sequelize(dbConfig);

User.init(connection);
Organization.init(connection);
EvolutionRecord.init(connection);
ProfessionalAttendance.init(connection);
Specialities.init(connection);
Calendar.init(connection);
Assisted.init(connection);
Related.init(connection);
SchoolRequest.init(connection);
TransportRequest.init(connection);

User.associate(connection.models);
Organization.associate(connection.models);
EvolutionRecord.associate(connection.models);
ProfessionalAttendance.associate(connection.models);
Specialities.associate(connection.models);
Calendar.associate(connection.models);
Assisted.associate(connection.models);
Related.associate(connection.models);
SchoolRequest.associate(connection.models);
TransportRequest.associate(connection.models);

module.exports = connection;