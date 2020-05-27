const { USER_ROLES } = require('../../../config/constants');

const userRolesEnum = Object.keys(USER_ROLES).map((key) => USER_ROLES[key]);

module.exports = {
	login: {
		type: 'object',
		properties: {
			email: {
				type: 'string',
				format: 'email',
			},
			password: {
				type: 'string',
				minLength: 8,
				maxLength: 50,
			},
      loginCode: {
        type: 'string',
        minLength: 4,
        maxLength: 4,
      },
		},
		required: ['email', 'password', 'loginCode'],
	},
  userLoginCode: {
		type: 'object',
		properties: {
			email: {
				type: 'string',
				format: 'email',
			},
			password: {
				type: 'string',
				minLength: 8,
				maxLength: 50,
			},
		},
		required: ['email', 'password'],
	},
  confirm: {
    type: 'object',
    properties: {
      token: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
    required: ['token', 'password'],
  },
	register: {
		type: 'object',
		properties: {
			email: {
				type: 'string',
				format: 'email',
			},
			firstName: {
				type: 'string',
				minLength: 2,
				maxLength: 50,
			},
			lastName: {
				type: 'string',
				minLength: 2,
				maxLength: 50,
			},
			password: {
				type: 'string',
				minLength: 8,
				maxLength: 50,
			},
      termsAndConditions: {
        type: 'string',
        format: 'date-time',
      },
			address: {
        country: {
					type: 'string',
					minLength: 2,
					maxLength: 200,
				},
				county: {
					type: 'string',
					minLength: 2,
					maxLength: 200,
				},
        city: {
          type: 'string',
          minLength: 2,
          maxLength: 200,
        },
        street: {
          type: 'string',
          minLength: 2,
          maxLength: 200,
        },
        houseNumber: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
        flatNumber: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
        },
				postalCode: {
					type: 'string',
          minLength: 2,
          maxLength: 50,
				},
			},
			userRole: {
				type: 'string',
				enum: userRolesEnum,
			},
		},
		required: ['email', 'firstName', 'lastName', 'password', 'country', 'county', 'city', 'street', 'postalCode'],
	},
  forgotPassword: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
    },
    required: ['email'],
  },
};
