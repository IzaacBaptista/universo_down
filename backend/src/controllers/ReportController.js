const { Op } = require('sequelize');
const express = require('express')

const EvolutionRecord = require('../models/EvolutionRecord');
const User = require('../models/User');
const Organization = require('../models/Organization')
const Assisted = require('../models/Assisted')


module.exports = {
  async show(req, res) {
    const organ = await EvolutionRecord.findAll({ 
      include: [
        {
          model: User, as: "user",
          model: Assisted, as: "assisteds"
        }
      ]
    });
    
    // console.log(JSON.stringify(organ, null, 2));

    return res.json(organ);

  }
};