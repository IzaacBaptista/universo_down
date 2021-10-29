const User = require("../models/User");
const Organization = require("../models/Organization");



module.exports = {
  async index(req, res) {
    // const users = await User.findAll();
    // return res.json(users);

    const { organization_id } = req.params;

    const user = await User.findByPk(organization_id,);

    return res.json(user);
  },

  async store(req, res) {
    const { organization_id } = req.params;
    const {
      first_name,
      last_name,
      email,
      password,
      admin_role,
      user_role,
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
      national_identify
    } = req.body;

    const organization = await Organization.findByPk(organization_id);

    if (!organization) {
      return res.status(400).json({ error: "Organization not found" });
    }

    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
      admin_role,
      user_role,
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
      national_identify,
      organization_id,
    });

    return res.json(user);
  },
};
