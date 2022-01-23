const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');
const { PERMISSIONS_KEYS: PERMISSIONS } = require('./defaults');

const { ObjectId } = mongoose.Types;

const GetBaseDomain = () => {
  return process.env.BASE_URL
    ? process.env.BASE_URL.substring(
        process.env.BASE_URL.indexOf('.'),
        process.env.BASE_URL.length
      )
    : undefined;
};

const GetSortValue = (key, val) => {
  try {
    if (!val) {
      return false;
    }

    if (key === '_id' && ObjectId.isValid(val)) {
      return ObjectId(val);
    }

    if (val && val instanceof Array) {
      const values = val.map(o => {
        const isValid = o !== '' && moment(o).isValid();
        if (isValid) {
          return moment(o).toDate();
        }
        return isValid;
      });
      return values || [false, false];
    }

    if (['createdAt', 'updatedAt'].includes(key) && moment(val).isValid()) {
      return moment(val).toDate();
    }
  } catch (err) {
    return false;
  }
};
//
const GetSortObj = ({ sortValue, sortKey, sortIndex }) => {
  let query = {};
  const key = sortKey || 'updatedAt';
  const index = sortIndex ? parseInt(sortIndex, 10) : -1;
  const sort = {};
  const operator = parseInt(index, 10) === -1 ? '$lt' : '$gt';
  sort[key] = index;
  const value = GetSortValue(key, sortValue);

  if (value) {
    query[key] = { [operator]: value };
  }

  if (value && value instanceof Array) {
    query = value.map(o => {
      if (o) {
        return { [key]: { [operator]: o } };
      }
      return {};
    });
  }
  return { query, sort };
};

const GetDateSplitObj = ({ keys, years, months }) => {
  const query = {};
  keys.map(key => {
    if (months[key]) {
      query[key] = {
        $gte: moment(months[key], 'YYYY-MM').startOf('month'),
        $lte: moment(months[key], 'YYYY-MM').endOf('month')
      };
    }
    if (years[key]) {
      query[key] = {
        $gte: moment()
          .year(years[key])
          .startOf('year'),
        $lte: moment()
          .year(years[key])
          .endOf('year')
      };
    }
  });
  return { query };
};

const GetSearchObj = ({ key }) => {
  if (key && key !== '') {
    const $or = [
      {
        'address.street': { $regex: key, $options: 'i' }
      },
      {
        'address.nearTo': { $regex: key, $options: 'i' }
      },
      {
        'address.highlight': { $regex: key, $options: 'i' }
      },
      {
        'address.government': { $regex: key, $options: 'i' }
      },
      {
        name: { $regex: key, $options: 'i' }
      }
    ];

    return $or;
  }
  return false;
};

const isAuthorized = ({ user, permissions }) => {
  let validPermissions = true;
  const userPermissions = user.permissions;

  // Show Everything to Admin
  if (user.permissions.includes(PERMISSIONS.ADMIN)) {
    return true;
  }

  // Don't show this for any one in followup branch

  const permissionAuthority =
    permissions &&
    permissions.length > 0 &&
    !_.some(userPermissions, o => permissions.includes(o));

  if (permissions && permissions.length && permissionAuthority) {
    validPermissions = false;
  }

  if (validPermissions) {
    return true;
  }

  return false;
};

module.exports = {
  GetBaseDomain,
  GetSortObj,
  GetSearchObj,
  GetDateSplitObj,
  isAuthorized
};
