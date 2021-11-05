const Assisted = require("../models/Assisted");
const TransportRequest = require("../models/TransportRequest");

module.exports = {
  async index(req, res) {
    const { assisted_id } = req.params;

    const assisted = await Assisted.findByPk(assisted_id, {
      include: { association: "transpor_requests" },
    });

    return res.json(assisted.transpor_requests);
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

    const transportRequest = await TransportRequest.create({
      date,
      response_date,
      status,
      assisted_id
    });

    return res.json(transportRequest);
  },
};
