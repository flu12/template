import {globalConstants} from "../constants/global";

export const toggleSidenav = () => ({ type: globalConstants.TOGGLE_SIDENAV });

export const toggleMenuHeader = (payload) => ({ type: globalConstants.TOGGLE_MENU_HEADER, payload });

export const toggleTermsAndConditions = (payload) => ({ type: globalConstants.TOGGLE_TERMS_AND_CONDITIONS, payload });
