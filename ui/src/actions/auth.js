import {authorizationConstants, LOGIN_STEPS} from '../constants/auth';
import http from '../services/httpService';
import {
  login as saveLogin,
  logout as saveLogout,
} from '../services/authService';
import { toggleMenuHeader } from './global';
import { onNotificationErrorInit, onNotificationSuccessInit } from './notifications';


export const onLogin = (data, history) => async (dispatch) => {
  try {
    dispatch(onLoginInit());

    const { token, user } = await http.post('/auth/login',data);

    await saveLogin(token);

    dispatch(onLoginSuccess(user));

    history.push('/');
  }
  catch (error) {
    dispatch(onLoginFailure());
    dispatch(onNotificationErrorInit(error));
  }
};


export const onRegister = (data, history) => async (dispatch) => {
	try {
		dispatch(onRegisterInit());

		// create account
    await http.post('/auth/register', data);

    const { email, password } = data;

    history.push({
      pathname: '/login/:activeStep',
      search: `?CODE_INPUT`,
      state: { email, password },
    });

    if (data.posesorIsho) {
      dispatch(onNotificationSuccessInit('Felicitari! Contul dumneavoastra a fost creat. Veti fi notificat prin email cand administratorul parcarii valideaza cardul ISHO pentru a putea beneficia de preturile speciale pentru posesorii de card ISHO.'));
    }
    else {
      dispatch(onNotificationSuccessInit('Felicitari! Contul dumneavoastra a fost creat.'));
    }

		dispatch(onRegisterSuccess());

	}
	catch (error) {
		dispatch(onRegisterFailure());
	}
};



export const isLoggedIn = () => async (dispatch) => {
  dispatch(onLoginInit());
  try {
    const { user } = await http.get('/auth/is-logged-in');
    dispatch(onLoginSuccess(user));
  }
  catch (error) {
    dispatch(onLoginFailure());
  }
};

export const logout = (history) => (dispatch) => {
  saveLogout();

  if (history) history.push('/');

  dispatch(logoutInit());
};

export const toggleActiveStepLogin = (payload) => ({ type: authorizationConstants.TOGGLE_ACTIVE_STEP_LOGIN, payload });

const onLoginInit = () => ({ type: authorizationConstants.ON_LOGIN_INIT });

const onLoginSuccess = (payload) => async (dispatch) => {
  const { _id } = payload;

  dispatch(onLoginDone(payload));

  dispatch(toggleMenuHeader(null));

};

const onLoginDone = (payload) => ({ type: authorizationConstants.ON_LOGIN_SUCCESS, payload });

const onLoginFailure = () => ({ type: authorizationConstants.ON_LOGIN_FAILURE });

const generateLoginCodeInit = () => ({ type: authorizationConstants.ON_GENERATE_LOGIN_CODE_INIT });

const generateLoginCodeSuccess = () => ({ type: authorizationConstants.ON_GENERATE_LOGIN_CODE_SUCCESS });

const generateLoginCodeFailure = () => ({ type: authorizationConstants.ON_GENERATE_LOGIN_CODE_FAILURE });

export const logoutInit = () => ({ type: authorizationConstants.ON_LOGOUT_INIT });

const onRegisterInit = () => ({ type: authorizationConstants.ON_REGISTER_INIT });

const onRegisterSuccess = () => ({ type: authorizationConstants.ON_REGISTER_SUCCESS });

const onRegisterFailure = () => ({ type: authorizationConstants.ON_REGISTER_FAILURE });
