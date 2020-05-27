module.exports = {
	save: {
		type: 'object',
		properties: {
			name: {
				type: 'string',
				minLength: 2,
				maxLength: 250,
			},
      description: {
        type: 'string',
        minLength: 2,
        maxLength: 5000,
      },
      price: {
        type: 'string',
      },
		},
		required: ['name', 'price'],
	},
};
