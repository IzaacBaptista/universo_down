const User = require('../models/User');
const ProfessionalAttendance = require('../models/ProfessionalAttendance');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { association: 'professional_attendances' }
    });

    return res.json(user.professional_attendances);
  },

  async findAll(req, res) {
    const professionalAttendance = await ProfessionalAttendance.findAll();

    return res.json(professionalAttendance);
  },
  
  async store(req, res) {
    const { user_id } = req.params;
    const {  
        date,
        result,
        quantity        
    } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const professionalAttendance = await ProfessionalAttendance.create({
        date,
        result,
        quantity,
        user_id,
    });

    return res.json(professionalAttendance);
  }
};