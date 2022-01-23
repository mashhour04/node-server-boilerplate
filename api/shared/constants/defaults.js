module.exports = {
  PERMISSIONS: [{ value: 'admin' }],
  PERMISSIONS_KEYS: { ADMIN: 'admin' },
  ObjectIdPattern: /^[0-9a-fA-F]{24}$/,
  PAGINATION: {
    LIMIT: 10000000000,
    LAST_ID: '000000000000'
  },
  REQUEST_STATUS: {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected'
  },
  REQUEST_RESPONSE: {
    ACCEPTED: 'accepted',
    REJECTED: 'rejected'
  },
  REQUEST_TYPES: {
    EDIT: 'edit',
    ADD: 'add'
  },
  ADMIN_EVENT_TYPES: {},
  EVENTS_TYPES: {
    ADMIN_NOTIFICATIONS_COUNT: 'admin_notifications_count',
    USER_NOTIFICATIONS_COUNT: 'renter_notifications_count'
  },
  SORT_KEYS: {
    UPDATED_AT: 'updatedAt',
    CREATED_AT: 'createdAt',
    _ID: '_id'
  },
  SORT_VALUES: {
    ASC: 1,
    DESC: -1
  },
  EDUCATION_RANKS_KEYS: {
    NORMAL: 'normal',
    AVERAGE: 'average',
    ABOVE_AVERAGE: 'above_average',
    HIGH: 'high'
  },

  MAIL_ACTIONS_KEYS: {
    execution: 'execution',
    show: 'show',
    knowledge: 'knowledge',
    answer: 'answer'
  },
  CONSTANT_TYPES: []
};
