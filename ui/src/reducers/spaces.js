
import { spacesConstants } from '../constants/spaces';

const reducer = {
	[spacesConstants.MANAGEMENT_SPACE_INIT]: (state) => ({ ...state, isLoading: spacesConstants.MANAGEMENT_SPACE_INIT }),
	[spacesConstants.MANAGEMENT_SPACE_SUCCESS]: (state) => ({ ...state, isLoading: null }),
	[spacesConstants.MANAGEMENT_SPACE_FAILURE]: (state) => ({ ...state, isLoading: null }),

	[spacesConstants.GET_ALL_SPACES_INIT]: (state) => ({ ...state, isLoading: spacesConstants.GET_ALL_SPACES_INIT }),
	[spacesConstants.GET_ALL_SPACES_SUCCESS]: (state, { payload }) => ({ ...state, isLoading: null, spaces: payload }),
	[spacesConstants.GET_ALL_SPACES_FAILURE]: (state) => ({ ...state, isLoading: null }),

	[spacesConstants.GET_SPACE_BY_ID_INIT]: (state) => ({ ...state, isLoading: spacesConstants.GET_SPACE_BY_ID_INIT }),
	[spacesConstants.GET_SPACE_BY_ID_SUCCESS]: (state) => ({ ...state, isLoading: null }),
	[spacesConstants.GET_SPACE_BY_ID_FAILURE]: (state) => ({ ...state, isLoading: null }),

	[spacesConstants.DELETE_SPACE_BY_ID_INIT]: (state) => ({ ...state, isLoading: spacesConstants.DELETE_SPACE_BY_ID_INIT }),
	[spacesConstants.DELETE_SPACE_BY_ID_SUCCESS]: (state) => ({ ...state, isLoading: null }),
	[spacesConstants.DELETE_SPACE_BY_ID_FAILURE]: (state) => ({ ...state, isLoading: null }),

	[spacesConstants.TOGGLE_SELECTED_SPACE]: (state, { payload }) => ({ ...state, selectedSpace: payload }),
};


const initialState = {
	isLoading: null,
	spaces: [],
	selectedSpace: null,
  selectedParkingTermsAndConditions: null,
	error: null
};

export default (state = initialState, action) => {
	return reducer[action.type] ? reducer[action.type](state, action) : state;
};
