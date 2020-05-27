import React, { Component } from 'react';
import { compose } from 'redux'
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

// ****** Material UI Components ********
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';

// ****** Own components *********
import { RenderTextField, RenderPasswordField, RenderCheckbox, RenderSelectField } from '../../common/formInputs/index';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {validatePassword} from "../../../utils/validations";


const styles = (theme) => ({
  userRoleIcon: {
    width: '72px !important',
  },
  userRoleSelect: {
    '& label': {
      fontWeight: 600,
    },
    '& span': {
      fontSize: '0.9rem',
      color: theme.palette.text.primary,
    },
    '& button': {
      padding: theme.spacing(3, 1),
      // '&:nth-child(1)': {
      //   backgroundColor: 'rgba(200, 200, 200, 0.7)',
      // },
      //
      // '&:nth-child(2)': {
      //   backgroundColor: 'rgba(222, 204, 158, 0.7)',
      // },
    },
    '&>div>div': {
      // boxShadow: theme.shadows[1],
      marginTop: theme.spacing(2),
    }
  },
});

const validate = (values, props) => {
  const errors = {};

  validatePassword(values, 'password', errors);
  if(values.confirmPassword !== values.password) {
    errors.confirmPassword = `Passwords don't match`
  }

  if (!props.isConfirm) {
    if (!values.email) {
      errors.email = 'Email address is required';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if(!values.firstName){
      errors.firstName = 'First name is required';
    }
    else if (values.firstName.length < 2) {
      errors.firstName = 'First name requires at least 2 characters';
    }
    else if (!values.firstName.length > 50) {
      errors.firstName = 'First name must be at most 50 characters';
    }

    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    }
    else if (values.lastName.length < 2) {
      errors.lastName = 'Last name requires at least 2 characters';
    }
    else if (!values.lastName.length > 50) {
      errors.lastName = 'Last name must be at most 50 characters';
    }

    if (!values.country) {
      errors.country = 'Country name is required';
    }
    else if (values.country.length < 2) {
      errors.country = 'Country name requires at least 2 characters';
    }
    else if (!values.country.length > 200) {
      errors.country = 'Country name must be at most 200 characters';
    }

    if (!values.county) {
      errors.county = 'County name is required';
    }
    else if (values.county.length < 2) {
      errors.county = 'County name requires at least 2 characters';
    }
    else if (!values.county.length > 200) {
      errors.county = 'County name must be at most 200 characters';
    }

    if (!values.city) {
      errors.city = 'City name is required';
    }
    else if (values.city.length < 2) {
      errors.city = 'City name requires at least 2 characters';
    }
    else if (!values.city.length > 200) {
      errors.city = 'City name must be at most 200 characters';
    }

    if (!values.street) {
      errors.street = 'Street name is required';
    }
    else if (values.street.length < 2) {
      errors.street = 'Street name requires at least 2 characters';
    }
    else if (!values.street.length > 200) {
      errors.street = 'Street name must be at most 200 characters';
    }

    if (!values.postalCode) {
      errors.postalCode = 'Postal code is required';
    }
    else if (values.postalCode.length < 2) {
      errors.postalCode = 'Postal code requires at least 2 characters';
    }
    else if (!values.postalCode.length > 50) {
      errors.postalCode = 'Postal code must be at most 50 characters';
    }

    if (values.posesorIsho) {
      if (!values.ishoCard) {
        errors.ishoCard = 'Numarul cardului ISHO este obligatorie';
      }

      // if (!values.ishoMemberType) {
      //   errors.ishoMemberType = 'Este necesara specificarea calitatea de detinator';
      // }
    }
  }

  return errors;
};

class RegisterForm extends Component {

  render() {
    const { isConfirm, isLoading, handleSubmit, posesorIsho, t, } = this.props;

    return (
      <Grid component="form" onSubmit={handleSubmit} container spacing={1} style={{ marginBottom: isConfirm ? 0 : 40, }}>
        <Grid item xs={12}>
          <Typography align="center" component="h2" variant="caption" color="textSecondary">
            {isConfirm ? 'Confirma cont intern' : t('Account details')}
          </Typography>
        </Grid>

        {
          isConfirm
            ? null
            : (
              <Grid item xs={12}>
                <Field
                  name="email"
                  component={RenderTextField}
                  label="Email *"
                  type="email"
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
            )
        }

        <Grid item xs={12} md={6}>
          <Field
            name="password"
            component={RenderPasswordField}
            label="Password *"
            margin="dense"
            variant="outlined"
            disabled={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Field
            name="confirmPassword"
            component={RenderPasswordField}
            label="Confirm Password *"
            margin="dense"
            variant="outlined"
            disabled={isLoading}
          />
        </Grid>

        {
          isConfirm
            ? (
              null
            )
            : (
              <>
                <Grid item xs={12} sm={6}>
                  <Collapse in={!!posesorIsho}>
                    <Field
                      name="ishoCard"
                      component={RenderTextField}
                      label="Numar card ISHO *"
                      margin="dense"
                      variant="outlined"
                    />
                  </Collapse>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Collapse in={!!posesorIsho}>
                    <Field
                      name="ishoMemberType"
                      component={RenderSelectField}
                      t={t}
                      options={[
                        { name: 'Membru ISHO', value: 'ishoMember' }
                      ]}
                      label="Calitate detinator *"
                      margin="dense"
                      variant="outlined"
                    />
                  </Collapse>
                </Grid>


                <Grid item xs={12} md={6}>
                  <Field
                    name="posesorIsho"
                    component={RenderCheckbox}
                    label="Posesor ISHO card"
                    disabled={isLoading}
                    t={t}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography align="center" component="h2" variant="caption" color="textSecondary">
                    {t('Billing details')}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field
                    name="firstName"
                    component={RenderTextField}
                    label="First Name *"
                    margin="dense"
                    variant="outlined"
                    disabled={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field
                    name="lastName"
                    component={RenderTextField}
                    label="Last Name *"
                    margin="dense"
                    variant="outlined"
                    disabled={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field
                    name="country"
                    component={RenderTextField}
                    label="Country *"
                    margin="dense"
                    variant="outlined"
                    disabled={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field
                    name="county"
                    component={RenderTextField}
                    label="County *"
                    margin="dense"
                    variant="outlined"
                    disabled={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field
                    name="city"
                    component={RenderTextField}
                    label="City *"
                    margin="dense"
                    variant="outlined"
                    disabled={isLoading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field
                    name="street"
                    component={RenderTextField}
                    label="Street *"
                    margin="dense"
                    variant="outlined"
                    disabled={isLoading}
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <Field
                    name="houseNumber"
                    component={RenderTextField}
                    label="House Number"
                    margin="dense"
                    variant="outlined"
                    disabled={isLoading}
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <Field
                    name="flatNumber"
                    component={RenderTextField}
                    label="Bloc"
                    margin="dense"
                    variant="outlined"
                    disabled={isLoading}
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <Field
                    name="scara"
                    component={RenderTextField}
                    label="Scara"
                    margin="dense"
                    variant="outlined"
                    disabled={isLoading}
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <Field
                    name="apartment"
                    component={RenderTextField}
                    label="Apartament"
                    margin="dense"
                    variant="outlined"
                    disabled={isLoading}
                  />
                </Grid>


                <Grid item xs={12} md={6}>
                  <Field
                    name="postalCode"
                    component={RenderTextField}
                    label="Postal Code *"
                    margin="dense"
                    variant="outlined"
                    disabled={isLoading}
                  />

                  <br />
                  <br />
                </Grid>
              </>
            )
        }

        <Grid item xs={12} className="flex justify-center">
          <div>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
            >
              {t('Create account')}
            </Button>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export const FORM_NAME = 'RegisterForm'; // a unique name for the form

// Create Redux Form

export default compose(
  reduxForm({
    form: FORM_NAME,
    validate,
  }),
  connect((state) => {
    return {
      posesorIsho: formValueSelector(FORM_NAME)(state, 'posesorIsho'),
    }
  }),
  withStyles(styles),
)(RegisterForm);
