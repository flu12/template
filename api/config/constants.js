module.exports = {
  HTTP_METHOD: {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
  },
  AUTH_METHODS: {
    LOCAL: 'LOCAL',
  },
  STATUSES: {
    WITHOUT_CARD: '',
    NEW: 'Nou',
    VALID: 'Valid',
    EXPIRED: 'Expirat'
  },
  USER_ROLES: {
    ADMIN: 'ADMIN',
    ACCOUNTABLE: 'ACCOUNTABLE',
    CLIENT: 'CLIENT',
  },
  ENVIRONMENTS: {
    DEVELOPMENT: 'development',
    TEST: 'test',
    PRODUCTION: 'production',
  },
  SUBSCRIPTION_TYPES: {
    in30DAYS: "30",
    in40DAYS: "40",
    in60DAYS: "60",
    in90DAYS: "90",
    in360DAYS: "360",
  },
  SUBSCRIPTION_STATUS: {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
  },
  PAYMENT_TYPES: {
    RECURRENT: 'RECURRENT',
    UNIQUE: 'UNIQUE',
  },
  UNSUBSCRIBE_METHODS: {
    WITH_DAYS: 'WITH_DAYS',
    WITHOUT_DAYS: 'WITHOUT_DAYS',
  },
};
