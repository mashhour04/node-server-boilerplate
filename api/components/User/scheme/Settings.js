const mongoose = require('mongoose');

const { Schema } = mongoose;

const Settings = new Schema(
  {
    userId: {
      type: String,
      ref: 'User'
    },
    unitId: {
      type: String,
      ref: 'Unit'
    },
    favorite: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    autoIndex: true
  }
);

module.exports = mongoose.model('Settings', Settings);
