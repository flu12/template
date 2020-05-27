import { authorizationConstants } from '../constants/auth';
import {USER_ROLES} from "../constants/global";

const setUserInfo = (userInfo) => {
  return {
    ...userInfo,
    isAdmin: userInfo && userInfo.userRoles && userInfo.userRoles.length && userInfo.userRoles.find((role) => role === USER_ROLES.ADMIN),
    isClient: userInfo && userInfo.userRoles && userInfo.userRoles.length && userInfo.userRoles.find((role) => role === USER_ROLES.CLIENT),
    isAccountable: userInfo && userInfo.userRoles && userInfo.userRoles.length && userInfo.userRoles.find((role) => role === USER_ROLES.ACCOUNTABLE),
  }
};

const reducer = {
  [authorizationConstants.ON_LOGIN_INIT]: (state) => ({ ...state, isLoading: authorizationConstants.ON_LOGIN_INIT }),
  [authorizationConstants.ON_LOGIN_SUCCESS]: (state, { payload }) => ({ ...state, isLoading: null, userInfo: setUserInfo(payload) }),
  [authorizationConstants.ON_LOGIN_FAILURE]: (state) => ({ ...state, isLoading: null }),

  [authorizationConstants.ON_GENERATE_LOGIN_CODE_INIT]: (state) => ({ ...state, isLoading: authorizationConstants.ON_GENERATE_LOGIN_CODE_INIT }),
  [authorizationConstants.ON_GENERATE_LOGIN_CODE_SUCCESS]: (state) => ({ ...state, isLoading: null,}),
  [authorizationConstants.ON_GENERATE_LOGIN_CODE_FAILURE]: (state) => ({ ...state, isLoading: null }),

  [authorizationConstants.ON_REGISTER_INIT]: (state) => ({ ...state, isLoading: authorizationConstants.ON_REGISTER_INIT }),
	[authorizationConstants.ON_REGISTER_SUCCESS]: (state) => ({ ...state, isLoading: null }),
	[authorizationConstants.ON_REGISTER_FAILURE]: (state) => ({ ...state, isLoading: null }),

  [authorizationConstants.TOGGLE_ACTIVE_STEP_LOGIN]: (state, { payload }) => ({ ...state, isLoading: null, activeStep: payload  }),
  [authorizationConstants.ON_LOGOUT_INIT]: (state) => ({ ...state, userInfo: null }),
};

const initialState = {
  userInfo: null,
	isLoading: null,
  activeStep: 0,
};

export default (state = initialState, action) => {
	return reducer[action.type] ? reducer[action.type](state, action) : state;
};
