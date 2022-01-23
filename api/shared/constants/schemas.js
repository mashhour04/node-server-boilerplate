const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const divSchema = new Schema(
  {
    unitId: {
      type: String,
      ref: 'Division',
      required: true
    },
    divisionId: {
      type: String,
      ref: 'Division'
    },
    confirmationNumber: {
      type: String
    },
    isChangeOfUnit: {
      type: Boolean,
      default: false
    },
    joinDate: {
      type: Date
    },
    releaseDate: {
      type: Date
    }
  },
  {
    _id: false,
    timestamps: true
  }
);

const influenceSchema = new Schema(
  {
    influenceId: {
      type: ObjectId,
      ref: 'Influence',
      required: true
    }
  },
  {
    _id: false,
    timestamps: true
  }
);

const clearnceSchema = new Schema(
  {
    clearanceId: { type: ObjectId, ref: 'Clearance' }
  },
  {
    _id: false,
    timestamps: true
  }
);

module.exports = {
  divSchema,
  influenceSchema,
  clearnceSchema
};
