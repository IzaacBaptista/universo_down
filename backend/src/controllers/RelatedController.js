const Assisted = require("../models/Assisted");
const Related = require("../models/Related");

module.exports = {
  async index(req, res) {
    const { assisted_id } = req.params;

    const assisted = await Assisted.findByPk(assisted_id, {
      include: { association: "relateds" },
    });

    return res.json(assisted.relateds);
  },

  async store(req, res) {
    const { assisted_id } = req.params;
    const {
      name,
      birthday,
      gender,
      civil_status,
      identification,
      relationship,
      general_registration,
      isseu,
      issuer,
      zip_code,
      address,
      number,
      neighborhood,
      city,
      state,
      phone,
      naturalness,
      nationality,
      scholarity,
      revenue,
      professional_situation,
      occupation,
      national_identify,
      responsible,
    } = req.body;

    const assisted = await Assisted.findByPk(assisted_id);

    if (!assisted) {
      return res.status(400).json({ error: "Assisted not found" });
    }

    const related = await Related.create({
      name,
      birthday,
      gender,
      civil_status,
      identification,
      relationship,
      general_registration,
      isseu,
      issuer,
      zip_code,
      address,
      number,
      neighborhood,
      city,
      state,
      phone,
      naturalness,
      nationality,
      scholarity,
      revenue,
      professional_situation,
      occupation,
      national_identify,
      responsible,
      assisted_id,
    });

    return res.json(related);
  },
};
