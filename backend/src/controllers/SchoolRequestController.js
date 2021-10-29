const Assisted = require("../models/Assisted");
const SchoolRequest = require("../models/SchoolRequest");

module.exports = {
//   async index(req, res) {
//     // const users = await SchoolRequest.findAll();
//     // return res.json(users);
//   },
    async index(req, res) {
        const { assisted_id } = req.params;
    
        const assisted = await Assisted.findByPk(assisted_id, {
          include: { association: "school_requests" },
        });
    
        return res.json(assisted.school_requests);
      },

  async store(req, res) {
    const { assisted_id } = req.params;
    const {
        date,
        response_date,
        status
    } = req.body;

    const assisted = await Assisted.findByPk(assisted_id);

    if (!assisted) {
      return res.status(400).json({ error: "Assisted not found" });
    }

    const schoolRequest = await SchoolRequest.create({
      date,
      response_date,
      status,
      assisted_id
    });

    return res.json(schoolRequest);
  },
};
