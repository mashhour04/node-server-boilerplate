const { Builder, ValidatorHelper } = require('validation-helpers');
const _ = require('lodash');
const signValidation = require('./signValidation');

module.exports.signValidation = signValidation(_, Builder, ValidatorHelper);
