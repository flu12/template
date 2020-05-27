import { countries, regions } from 'country-data';

const getEuropeanCountries = () => {
  return [].concat(...Object.keys(regions)
    .filter(key => key.includes('Europe'))
    .map(key => {
      const countryCodes = regions[key].countries;

      return countryCodes.map(countryCode => countries[countryCode]);
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const COUNTRY_NAME_SELECT_OPTIONS = getEuropeanCountries().map(({ name }) => ({
  name,
  label: name,
  value: name,
}));

export const globalConstants = {
  CREATE_TERMS_AND_CONDITIONS_INIT: '@CREATE_TERMS_AND_CONDITIONS_INIT',
  CREATE_TERMS_AND_CONDITIONS_SUCCESS: '@CREATE_TERMS_AND_CONDITIONS_SUCCESS',
  CREATE_TERMS_AND_CONDITIONS_FAILURE: '@CREATE_TERMS_AND_CONDITIONS_FAILURE',

  TOGGLE_SIDENAV: '@TOGGLE_SIDENAV',
  TOGGLE_MENU_HEADER: '@TOGGLE_MENU_HEADER',
  TOGGLE_TERMS_AND_CONDITIONS: '@TOGGLE_TERMS_AND_CONDITIONS',
};

export const GOOGLE_MAPS_API_KEY = 'AIzaSyDSpSkRd1tks2XFik5TfzmzBVQkcn_1WPg';

export const ISHO_STATUSES = {
  WITHOUT_CARD: '',
  NEW: 'Nou',
  VALID: 'Valid',
  EXPIRED: 'Expirat',
};

export const USER_ROLES = {
  CLIENT: 'CLIENT',
  ADMIN: 'ADMIN',
  ACCOUNTABLE: 'ACCOUNTABLE',
};

export const LIST_USER_ROLES =
  [
    USER_ROLES.CLIENT,
    USER_ROLES.ADMIN,
    USER_ROLES.ACCOUNTABLE,
  ].map( name  => ({name, label: name, value: name,}));


export const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const LIST_HTTP_METHOD =
  [
    HTTP_METHOD.GET,
    HTTP_METHOD.POST,
    HTTP_METHOD.PUT,
    HTTP_METHOD.DELETE
  ].map( name  => ({name, label: name, value: name,}));
