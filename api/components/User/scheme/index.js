const makeUserScheme = require('./UserScheme');
const { defaultConstants } = require('../../../shared/constants');

const permissions = defaultConstants.PERMISSIONS.map(o => o.value);

module.exports = makeUserScheme({
  permissions
});
