import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form'
import { lookup } from 'country-data';

// ******* Own dependencies **********
import { RenderTextField, RenderSelectField } from '../../common/formInputs/index';
import http from '../../../services/httpService';

// ******* Material UI dependencies **********
import Grid from "@material-ui/core/Grid";
import {COUNTRY_NAME_SELECT_OPTIONS} from "../../../constants/global";

class AddressFields extends Component {
  state = {
    country: null,
    states: [],
  };

  getCountryStates = () => {
    const { country } = this.state;
    const countryInfo = lookup.countries({name: country})[0];

    if (countryInfo) {
      const countryCode = countryInfo.alpha2;

      http.post('/globals/get-country-states', {
        countryCode,
      })
        .then(({ states }) => {
          this.setState({ states })
        })
        .catch((error) => {
          console.log('Failed to get states for ' + country + ' - ' + countryCode);
          console.log(error);
        })
    }
  };

  setCountry = (country) => {
    this.setState({ country }, () => this.getCountryStates());
  };

  componentDidMount() {
    const { initialValues } = this.props;

    if (initialValues && initialValues.country) {
      this.setCountry(initialValues.country);
    }
  }

  render() {
    const { t } = this.props;
    const { states } = this.state;
    const disabledFields = !(states && states.length);

    return (
      <Fragment>
        <Grid item xs={12} md={6}>
          <Field
            name="country"
            component={RenderSelectField}
            options={COUNTRY_NAME_SELECT_OPTIONS}
            onChange={(_, value) => this.setCountry(value)}
            label="Country *"
            margin="dense"
            variant="outlined"
            t={t}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Field
            name="county"
            component={RenderSelectField}
            options={states.map((state) => ({ name: state, value: state }))}
            label="County *"
            margin="dense"
            variant="outlined"
            disabled={disabledFields}
            t={t}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Field
            name="city"
            component={RenderTextField}
            label="City *"
            margin="dense"
            variant="outlined"
            disabled={disabledFields}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Field
            name="street"
            component={RenderTextField}
            label="Street *"
            margin="dense"
            variant="outlined"
            disabled={disabledFields}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Field
            name="houseNumber"
            component={RenderTextField}
            label="House Number *"
            margin="dense"
            variant="outlined"
            disabled={disabledFields}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Field
            name="postalCode"
            component={RenderTextField}
            label="Postal Code *"
            margin="dense"
            variant="outlined"
            disabled={disabledFields}
          />
        </Grid>

      </Fragment>
    );
  }
}

AddressFields.propTypes = {
  initialValues: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default AddressFields;






