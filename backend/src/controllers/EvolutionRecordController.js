const User = require('../models/User');
const EvolutionRecord = require('../models/EvolutionRecord');
const { findAll } = require('../models/User');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { association: 'evolution_records' }
    });

    return res.json(user.evolution_records);
  },

  async findAll(req, res) {
    const evolutionRecords = await EvolutionRecord.findAll();

    return res.json(evolutionRecords);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { assisted_id } = req.params;
    const {  
        date,
        status,
        weight,
        height,
        report
    } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    
    const evolutionRecord = await EvolutionRecord.create({
        date,
        status,
        weight,
        height,
        report,
        user_id,
        assisted_id,
    });

    return res.json(evolutionRecord);
  }
};