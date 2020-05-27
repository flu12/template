import { parkingZonesConstants } from '../constants/parkingZones';
import http from '../services/httpService';
import { spacesConstants } from '../constants/spaces';
import {onNotificationSuccessInit, onNotificationErrorInit} from "./notifications";
import { getParkingZoneById, getAllParkingZones, toggleParkingZoneTermsAndConditions } from './parkingZones';

/**
 * Create an http request to create/edit a parking zone
 * Depending on the data object provided, if it has the _id field, we'll edit, otherwise create
 * */
export const managementSpace = (data) => async (dispatch) => {
	dispatch(managementSpaceInit());

	try {
		const url = data._id ? '/admin/products/' + data._id : '/admin/products';
		const httpRequest = data && data._id ? http.put : http.post;

		await httpRequest(`${url}`, data);
		dispatch(managementSpaceSuccess());
		dispatch(toggleSelectedSpace(null));
		dispatch(getAllSpaces());
    dispatch(getAllParkingZones());
    if(data._id){
      dispatch(onNotificationSuccessInit("The building has been edited"));
    }
    else {
      dispatch(onNotificationSuccessInit("The building has been created"));
    }
	}
	catch (e) {
		dispatch(managementSpaceFailure());
    dispatch(onNotificationErrorInit(e))
	}
};

export const getAllSpaces = () => async (dispatch) => {
	dispatch(getAllSpacesInit());

	try {
		const { spaces } = await http.get('/admin/products');
		dispatch(getAllSpacesSuccess(spaces));
	}
	catch (e) {
		dispatch(getAllSpacesFailure());
	}
};

export const getSpaceById = (spaceId) => async (dispatch) => {
	dispatch(getSpaceByIdInit());

	try {
		const { parkingZone } = await http.get(`/admin/spaces/${spaceId}`);
		dispatch(getSpaceByIdSuccess(parkingZone));
	}
	catch (e) {
		dispatch(getSpaceByIdFailure());
	}
};

export const deleteSpaceById = (spaceId) => async (dispatch) => {
	dispatch(deleteSpaceByIdInit());

	try {
		await http.delete(`/admin/spaces/${spaceId}`);
		dispatch(deleteSpaceByIdSuccess());
		dispatch(getAllSpaces());
    dispatch(getAllParkingZones());
	}
	catch (e) {
		dispatch(deleteSpaceByIdFailure());
	}
};

export const saveParkingTermsAndConditions = (parkingZoneId, data) => async (dispatch) => {
  dispatch(managementSpaceInit());

  try {
    await http.post(`/admin/spaces/terms-and-conditions/${parkingZoneId}`, data);

    dispatch(getAllSpaces());
    dispatch(getAllParkingZones());
    dispatch(onNotificationSuccessInit('Terms and conditions updated'));
    dispatch(managementSpaceSuccess());
    dispatch(toggleParkingTermsAndConditions(null));
  }
  catch (e) {
    dispatch(managementSpaceFailure());
  }
};

export const toggleParkingTermsAndConditions = (payload) => ({ type: parkingZonesConstants.TOGGLE_PARKING_ZONE_TERMS_AND_CONDITIONS, payload });


// **************** Redux store management actions ***************

export const toggleSelectedSpace = (payload) => ({ type: spacesConstants.TOGGLE_SELECTED_SPACE, payload });

const managementSpaceInit = () => ({ type: spacesConstants.MANAGEMENT_SPACE_INIT });

const managementSpaceFailure = () => ({ type: spacesConstants.MANAGEMENT_SPACE_FAILURE });

const managementSpaceSuccess = (payload) => ({ type: spacesConstants.MANAGEMENT_SPACE_SUCCESS, payload });

const getAllSpacesInit = () => ({ type: spacesConstants.GET_ALL_SPACES_INIT });

const getAllSpacesFailure = () => ({ type: spacesConstants.GET_ALL_SPACES_FAILURE });

const getAllSpacesSuccess = (payload) => ({ type: spacesConstants.GET_ALL_SPACES_SUCCESS, payload });

const getSpaceByIdInit = () => ({ type: spacesConstants.GET_SPACE_BY_ID_INIT });

const getSpaceByIdFailure = () => ({ type: spacesConstants.GET_SPACE_BY_ID_FAILURE });

const getSpaceByIdSuccess = (payload) => ({ type: spacesConstants.GET_SPACE_BY_ID_SUCCESS, payload });

const deleteSpaceByIdInit = () => ({ type: spacesConstants.DELETE_SPACE_BY_ID_INIT });

const deleteSpaceByIdFailure = () => ({ type: spacesConstants.DELETE_SPACE_BY_ID_FAILURE });

const deleteSpaceByIdSuccess = () => ({ type: spacesConstants.DELETE_SPACE_BY_ID_SUCCESS });
