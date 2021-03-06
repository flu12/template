export const authorizationConstants = {
  ON_LOGIN_INIT: '@ON_LOGIN_INIT',
  ON_LOGIN_SUCCESS: '@ON_LOGIN_SUCCESS',
  ON_LOGIN_FAILURE: '@ON_LOGIN_FAILURE',

  ON_GENERATE_LOGIN_CODE_INIT: '@ON_GENERATE_LOGIN_CODE_INIT',
  ON_GENERATE_LOGIN_CODE_SUCCESS: '@ON_GENERATE_LOGIN_CODE_SUCCESS',
  ON_GENERATE_LOGIN_CODE_FAILURE: '@ON_GENERATE_LOGIN_CODE_FAILURE',

  ON_LOGOUT_INIT: '@ON_LOGOUT_INIT',

  ON_REGISTER_INIT: '@ON_REGISTER_INIT',
	ON_REGISTER_SUCCESS: '@ON_REGISTER_SUCCESS',
	ON_REGISTER_FAILURE: '@ON_REGISTER_FAILURE',

  TOGGLE_ACTIVE_STEP_LOGIN: '@TOGGLE_ACTIVE_STEP_LOGIN',
};

export const LOGIN_TOKEN_STORAGE_KEY = '@PARKING_LOGIN_TOKEN_STORAGE_KEY';

export const LOGIN_STEPS = {
  CREDENTIALS: 0,
  CODE_INPUT: 1,
};

