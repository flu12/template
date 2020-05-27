import { globalConstants } from '../constants/global';

const reducer = {
  [globalConstants.TOGGLE_SIDENAV]: (state) => ({ ...state, sidenavOpened: !state.sidenavOpened }),

  [globalConstants.TOGGLE_MENU_HEADER]: (state, { payload }) => ({ ...state, menuHeaderOpened: payload }),

  [globalConstants.TOGGLE_TERMS_AND_CONDITIONS]: (state, { payload }) => ({ ...state, selectedTermsAndConditions: payload }),
};


const initialState = {
  sidenavOpened: false,
  menuHeaderOpened: null,
  selectedTermsAndConditions: null,
};

export default (state = initialState, action) => {
  return reducer[action.type] ? reducer[action.type](state, action) : state;
};
