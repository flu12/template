export const usersConstants = {
  SEARCH_CLIENTS_INIT: '@SEARCH_CLIENTS_INIT',
  SEARCH_CLIENTS_SUCCESS: '@SEARCH_CLIENTS_SUCCESS',
  SEARCH_CLIENTS_FAILURE: '@SEARCH_CLIENTS_FAILURE',

  SEARCH_INTERNAL_USERS_INIT: '@SEARCH_INTERNAL_USERS_INIT',
  SEARCH_INTERNAL_USERS_SUCCESS: '@SEARCH_INTERNAL_USERS_SUCCESS',
  SEARCH_INTERNAL_USERS_FAILURE: '@SEARCH_INTERNAL_USERS_FAILURE',

  EDIT_ISHO_CARD_INIT: '@EDIT_ISHO_CARD_INIT',
  EDIT_ISHO_CARD_SUCCESS: '@EDIT_ISHO_CARD_SUCCESS',
  EDIT_ISHO_CARD_FAILURE: '@EDIT_ISHO_CARD_FAILURE',

  EDIT_USER_INIT: '@EDIT_USER_INIT',
  EDIT_USER_SUCCESS: '@EDIT_USER_SUCCESS',
  EDIT_USER_FAILURE: '@EDIT_USER_FAILURE',

  DELETE_USER_BY_ID_INIT: '@DELETE_USER_BY_ID_INIT',
  DELETE_USER_BY_ID_SUCCESS: '@DELETE_USER_BY_ID_SUCCESS',
  DELETE_USER_BY_ID_FAILURE: '@DELETE_USER_BY_ID_FAILURE',

  TOGGLE_SELECTED_USER: '@TOGGLE_SELECTED_USER',
};

export const usersRows =
  [
    {
      id: 'email',
      name: 'Email',
      align: 'left',
    },
    {
      id: 'address',
      name: 'Address',
      align: 'left',
    },
    {
      id: 'ishoCard',
      name: 'ISHO Card',
      align: 'center',
    },
    {
      id: 'status',
      name: 'Status',
      align: 'center',
    },
    {
      id: 'editOrDelete',
      name: '',
      align: 'center',
    },
  ];

export const internalUsersRows =
  [
    {
      id: 'accountType',
      name: 'Account Type',
      align: 'center',
    },
    {
      id: 'email',
      name: 'Email',
      align: 'left',
    },
    {
      id: 'firstName',
      name: 'First Name',
      align: 'left',
    },
    {
      id: 'lastName',
      name: 'Last Name',
      align: 'left',
    },
    {
      id: 'editOrDelete',
      name: '',
      align: 'center',
    },
  ];
