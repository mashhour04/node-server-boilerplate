const scheme = require('../scheme');

// ! should not require anything else than scheme
const _GenericModel = require('../../shared/models/GenericModel');

module.exports = ({ GenericModel = _GenericModel }) => {
  class UserModel extends GenericModel {
    // constructor(DbAccess = scheme) {
    //   super(DbAccess);
    // }

    getUsersWithIds(usersIds) {
      return this.getMany({
        query: { _id: { $in: usersIds } }
      });
    }

    getUsersWithusernameSearch(username) {
      return this.getMany({
        query: { username: { $in: [new RegExp(`^${username}`, 'i')] } }
      });
    }

    getUsersWithPermissions(permissions) {
      return this.getMany({
        query: { permissions: { $in: permissions } }
      });
    }

    async getUsers(
      params = {
        query: {},
        select: '',
        sort: { _id: 1 },
        skip: 0,
        limit: 10000000000,
        populate: []
      }
    ) {
      const { limit, query, select, sort, populate } = params;
      const response = await this.DbAccess.paginate(query, {
        select,
        sort,
        limit,
        populate
      });

      return {
        hasNext: response.hasNextPage,
        users: response.docs,
        total: response.totalDocs
      };
    }

    anotherSpecificModelFunc() {
      return this.getAggregate([
        {
          complexAggs: ''
        }
      ]);
    }
  }
  return new UserModel(scheme);
};
