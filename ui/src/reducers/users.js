import { usersConstants } from '../constants/users';

const getClientSubscriptions = (clients) => {
  const subscriptions = [];

  clients.forEach((client) => {
    if (client.parkingSubscriptions && client.parkingSubscriptions.length) {
      client.parkingSubscriptions.forEach((subscription) => {
        subscriptions.push({
          ...subscription,
          user: {
            ...client,
            parkingSubscriptions: null,
          },
        })
      })
    }
  });

  return subscriptions;
};

const reducer = {
  [usersConstants.SEARCH_CLIENTS_INIT]: (state, { payload }) => ({ ...state, isLoading: usersConstants.SEARCH_CLIENTS_INIT, searchParams: payload }),
  [usersConstants.SEARCH_CLIENTS_SUCCESS]: (state, { payload }) => ({ ...state, isLoading: null, clients: payload, clientsSubscriptions: getClientSubscriptions(payload) }),
  [usersConstants.SEARCH_CLIENTS_FAILURE]: (state) => ({ ...state, isLoading: null }),

  [usersConstants.SEARCH_INTERNAL_USERS_INIT]: (state, { payload }) => ({ ...state, isLoading: usersConstants.SEARCH_INTERNAL_USERS_INIT, searchParams: payload }),
  [usersConstants.SEARCH_INTERNAL_USERS_SUCCESS]: (state, { payload }) => ({ ...state, isLoading: null, internalUsers: payload }),
  [usersConstants.SEARCH_INTERNAL_USERS_FAILURE]: (state) => ({ ...state, isLoading: null }),

  [usersConstants.EDIT_ISHO_CARD_INIT]: (state) => ({ ...state, isLoading: usersConstants.EDIT_ISHO_CARD_INIT }),
  [usersConstants.EDIT_ISHO_CARD_SUCCESS]: (state) => ({ ...state, isLoading: null }),
  [usersConstants.EDIT_ISHO_CARD_FAILURE]: (state) => ({ ...state, isLoading: null }),

  [usersConstants.EDIT_USER_INIT]: (state) => ({ ...state, isLoading: usersConstants.EDIT_USER_INIT }),
  [usersConstants.EDIT_USER_SUCCESS]: (state) => ({ ...state, isLoading: null }),
  [usersConstants.EDIT_USER_FAILURE]: (state) => ({ ...state, isLoading: null }),

  [usersConstants.DELETE_USER_BY_ID_INIT]: (state) => ({ ...state, isLoading: usersConstants.DELETE_USER_BY_ID_INIT }),
  [usersConstants.DELETE_USER_BY_ID_SUCCESS]: (state) => ({ ...state, isLoading: null }),
  [usersConstants.DELETE_USER_BY_ID_FAILURE]: (state) => ({ ...state, isLoading: null }),


  [usersConstants.TOGGLE_SELECTED_USER]: (state, { payload }) => ({ ...state, selectedUser: payload }),
};

const initialState = {
  isLoading: null,
  clients: [],
  clientsSubscriptions: [],
  internalUsers: [],
  selectedUser: null,
  valuesSearch: {},
};

export default (state = initialState, action) => {
  return reducer[action.type] ? reducer[action.type](state, action) : state;
};
