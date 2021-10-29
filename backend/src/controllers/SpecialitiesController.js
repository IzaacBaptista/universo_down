const User = require('../models/User');
const Specialities = require('../models/Specialities');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { association: 'specialities' }
    });

    return res.json(user.specialities);
  },

  async findAll(req, res) {
    const specialities = await Specialities.findAll();

    return res.json(specialities);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const {  
        
    } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const specialities = await Specialities.create({
        user_id
    });

    return res.json(specialities);
  }
};