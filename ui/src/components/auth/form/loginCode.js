import { Typography } from '@material-ui/core';
import React from 'react';
import compose from 'lodash/fp/compose';
import {Field, formValueSelector, reduxForm} from 'redux-form';

// ****** Material UI dependencies
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// ****** Own components *********
import {RenderTextField} from '../../common/formInputs/index';
import {onNotificationSuccessInit} from "../../../actions/notifications";

const styles = {};

/**
 * Login validation function
 * @return {Object} error - an error object with key:value error pair
 * */
const validate = (values) => {
  const errors = {};

  if (!values.code) {
    errors.code = 'Code required';
  }
  else if (Object.keys(values.code).length !== 4) {
    errors.code = 'The login code must be 4 digits long';
  }

  return errors;
};

const LoginCodeForm = ({handleSubmit, onNotificationSuccessInit, isLoading, generateLoginCode, userDetails, t}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1} justify="space-between">
        <Grid item xs={12}>
          <Typography gutterBottom>
            Un email cu codul de access a fost trimis. Va rugam introduceti codul primit pentru a putea accesa aplicatia.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Field
            name="code"
            component={RenderTextField}
            label="Cod de access"
            margin="normal"
            variant="outlined"
            disabled={isLoading}
            required
          />
        </Grid>

        <Grid item xs={12} className="flex justify-center">
          <Button variant="contained" type="submit" color="primary">
            {t('Access app')}
          </Button>
          &nbsp;
          <Button
            onClick={() => {
              generateLoginCode(userDetails);
              onNotificationSuccessInit("The login code has been sent by email");
              }
            }
            variant="outlined"
            color="primary"
            type="button"
          >
            {t('Resend the code')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export const FORM_NAME = 'LoginCodeForm'; // a unique name for the form

// Create Redux Form
export default compose(
  reduxForm({
    form: FORM_NAME,
    validate,
  }),
  withStyles(styles),
)(LoginCodeForm);
