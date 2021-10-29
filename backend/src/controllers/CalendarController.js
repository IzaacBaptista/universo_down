const User = require("../models/User");
const Calendar = require("../models/Calendar");

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: {
        association: "calendars",
        attributes: [
            "day_of_week", 
            "start_hour", 
            "end_hour"
        ],
        through: {
          attributes: [],
        },
      },
    });

    return res.json(user.calendars);
  },

  async findAll(req, res) {
    const calendar = await Calendar.findAll();

    return res.json(calendar);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { 
        day_of_week, 
        start_hour, 
        end_hour 
    } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const [calendar] = await Calendar.findOrCreate({
      where: {
        day_of_week,
        start_hour,
        end_hour,
      },
    });

    await user.addCalendar(calendar);

    return res.json(calendar);
  },

  async delete(req, res) {
    const { user_id } = req.params;
    const { 
        day_of_week,
        start_hour,
        end_hour,
     } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const calendar = await Calendar.findOne({
      where: {
        day_of_week,
        start_hour,
        end_hour,
      },
    });

    await user.removeTech(calendar);

    return res.json();
  },
};
