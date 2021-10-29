const Organization = require("../models/Organization");

module.exports = {
  async index(req, res) {
    const organizations = await Organization.findAll();

    return res.json(organizations);
  },

  async store(req, res) {
    const { name, description, domain } = req.body;

    const organization = await Organization.create({
      name,
      description,
      domain,
    });

    return res.json(organization);
  },

  async delete(req, res) {
    const { organization_id } = req.params;
    const organization = await Organization.findByPk(organization_id);

    if (!organization) {
      return res.status(400).json({ error: "Organization not found" });
    }

    Organization.destroy({
      where: {
        id: organization_id,
      },
    }).then(
      function (rowDeleted) {
        if (rowDeleted === 1) {
          console.log("Deleted successfully");
        }
      },
      function (err) {
        console.log("ERRO" + err);
      }
    );
  },
};
