const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    trim: true
  },

  organization: {
    type: String,
    default: ""
  },

  category: {
    type: String,
    default: ""
  },

  qualification: {
    type: String,
    default: ""
  },

  state: {
    type: String,
    default: "All India"
  },

  graduateOnly: {
    type: Boolean,
    default: false
  },

  vacancies: {
    type: Number,
    default: 0
  },

  salary: {
    type: String,
    default: ""
  },

  lastDate: {
    type: String,
    default: ""
  },

  applyLink: {
    type: String,
    default: ""
  },

  notificationLink: {
    type: String,
    default: ""
  },

  source: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

// Useful indexes for searching
JobSchema.index({
  title: "text",
  organization: "text",
  qualification: "text",
  category: "text"
});

module.exports = mongoose.model("Job", JobSchema);