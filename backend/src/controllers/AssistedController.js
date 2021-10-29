const Assisted = require("../models/Assisted");

module.exports = {
  async index(req, res) {
    const assisteds = await Assisted.findAll();
    return res.json(assisteds);
  },

  async store(req, res) {
    const {
        name,
        birthday,
        gender,
        identification,
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
        has_benefits,
        scholarity,
        naturalness,
        nationality,
        occupation,
        national_identify,
        active,
        additional_information,
        photo,
        benefits,
        social_identification_number
    } = req.body;

    const assisted = await Assisted.create({
        name,
        birthday,
        gender,
        identification,
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
        has_benefits,
        scholarity,
        naturalness,
        nationality,
        occupation,
        national_identify,
        active,
        additional_information,
        photo,
        benefits,
        social_identification_number
    });

    return res.json(assisted);
  },
};
