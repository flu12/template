import { getFormValues } from 'redux-form';
import http from "../services/httpService";
import {usersConstants} from "../constants/users";
import {onNotificationErrorInit, onNotificationSuccessInit} from "./notifications";
import {globalConstants} from "../constants/global";
import {toggleTermsAndConditions} from "./global";
import moment from "moment";
import {isLoggedIn} from "./auth";

export const editIshoCard = (user) => async (dispatch, getState) => {
  dispatch(editIshoCardInit());

  try {
    const { ishoCard, status } = user;
    await http.put(`/admin/users/${user._id}`, { ishoCard, status });

    dispatch(editIshoCardSuccess());
    dispatch(toggleSelectedUser(null));
    dispatch(onNotificationSuccessInit("Modificari salvate cu success"));
    dispatch(searchClients(getFormValues('UsersFilterForm')(getState())));
  }
  catch (e) {
    dispatch(editIshoCardFailure());
  }
};

export const editUser = (user) => async (dispatch, getStore) => {
  dispatch(editUserInit());

  try {
    await http.put(`/admin/users/${user._id}`, user);

    dispatch(editUserSuccess());
    dispatch(onNotificationSuccessInit("Detalile contului au fost modificate"));
    dispatch(isLoggedIn());
    dispatch(searchInternalUsers());
    dispatch(searchClients());
  }
  catch (e) {
    dispatch(editUserFailure());
  }
};

export const createTermsAndConditions = () => async(dispatch, getStore) => {
  dispatch(createTermsAndConditionsInit());
  try {
    const entireReduxStore = getStore();
    const user = entireReduxStore.auth.userInfo;
    const termsAndConditions = moment();
    const userDetails = {...termsAndConditions, ...user};

    await http.put(`/admin/users/${user._id}`, userDetails);

    dispatch(createTermsAndConditionsSuccess());
    dispatch(toggleTermsAndConditions( null));
  }
  catch (e) {
    dispatch(createTermsAndConditionsFailure());
    dispatch(onNotificationErrorInit(e));
  }
};

export const searchClients = (data) => async (dispatch) => {
  dispatch(searchClientsInit(data));

  if (data.isActive) {
    if (data.isActive === 'true') data.isActive = true;
    if (data.isActive === 'false') data.isActive = false;
  }

  try {
    const {users} = await http.post('/admin/users/clients-search', data);
    dispatch(searchClientsSuccess(users));
  }
  catch (e) {
    dispatch(searchClientsFailure());
  }
};

export const searchInternalUsers = (data) => async (dispatch) => {
  dispatch(searchInternalUsersInit(data));

  try {
    const {users} = await http.post('/admin/users/internal-search', data);
    dispatch(searchInternalUsersSuccess(users));
  }
  catch (e) {
    dispatch(searchInternalUsersFailure());
  }
};

export const saveInternalUser = (user) => async (dispatch, getStore) => {
  dispatch(editUserInit());

  try {
    const url = user._id ? `/admin/users/internal/${user._id}` : `/admin/users/internal`;
    const request = user._id ? http.put : http.post;
    await request(url, user);

    dispatch(editUserSuccess());
    dispatch(toggleSelectedUser(null));
    dispatch(searchInternalUsers({}));
    dispatch(onNotificationSuccessInit("Detalile contului au fost modificate"));
    dispatch(isLoggedIn());
  }
  catch (e) {
    dispatch(editUserFailure());
  }
};

export const deleteUserById = (userId) => async (dispatch) => {
  dispatch(deleteUserByIdInit());

  try {
    await http.delete(`/admin/users/${userId}`);
    dispatch(deleteUserByIdSuccess());
    dispatch(searchClients({}));
  }
  catch (e) {
    dispatch(deleteUserByIdFailure());
  }
};

export const toggleSelectedUser = (payload) => ({ type: usersConstants.TOGGLE_SELECTED_USER, payload });

const editIshoCardInit = () => ({ type: usersConstants.EDIT_ISHO_CARD_INIT });

const editIshoCardFailure = () => ({ type: usersConstants.EDIT_ISHO_CARD_FAILURE });

const editIshoCardSuccess = () => ({ type: usersConstants.EDIT_ISHO_CARD_SUCCESS});

const editUserInit = () => ({ type: usersConstants.EDIT_USER_INIT });

const editUserFailure = () => ({ type: usersConstants.EDIT_USER_FAILURE });

const editUserSuccess = () => ({ type: usersConstants.EDIT_USER_SUCCESS});

const createTermsAndConditionsInit = () => ({ type: globalConstants.CREATE_TERMS_AND_CONDITIONS_INIT });

const createTermsAndConditionsFailure = () => ({ type: globalConstants.CREATE_TERMS_AND_CONDITIONS_FAILURE});

const createTermsAndConditionsSuccess = () => ({ type: globalConstants.CREATE_TERMS_AND_CONDITIONS_SUCCESS });

const searchClientsInit = (payload) => ({ type: usersConstants.SEARCH_CLIENTS_INIT, payload });

const searchClientsFailure = () => ({ type: usersConstants.SEARCH_CLIENTS_FAILURE });

const searchClientsSuccess = (payload) => ({ type: usersConstants.SEARCH_CLIENTS_SUCCESS, payload });

const searchInternalUsersInit = (payload) => ({ type: usersConstants.SEARCH_INTERNAL_USERS_INIT, payload });

const searchInternalUsersFailure = () => ({ type: usersConstants.SEARCH_INTERNAL_USERS_FAILURE });

const searchInternalUsersSuccess = (payload) => ({ type: usersConstants.SEARCH_INTERNAL_USERS_SUCCESS, payload });

const deleteUserByIdInit = () => ({ type: usersConstants.DELETE_USER_BY_ID_INIT });

const deleteUserByIdFailure = () => ({ type: usersConstants.DELETE_USER_BY_ID_FAILURE });

const deleteUserByIdSuccess = () => ({ type: usersConstants.DELETE_USER_BY_ID_SUCCESS });
