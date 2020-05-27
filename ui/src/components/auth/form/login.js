import React from 'react';
import compose from 'lodash/fp/compose';
import { Field, reduxForm } from 'redux-form';

// ****** Material UI dependencies
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// ****** Own components *********
import { RenderTextField, RenderPasswordField } from '../../common/formInputs/index';
import {Link} from "react-router-dom";

const styles = {
};

/**
 * Login validation function
 * @return {Object} error - an error object with key:value error pair
 * */
const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email address is required';
  }
  else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }
  else if (values.password.length < 8 ) {
    errors.password = 'Password requires at least 8 characters';
  }

  return errors;
};

const LoginForm = ({ handleSubmit, isLoading, t }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1} justify="space-between">
        <Grid item xs={12}>
          <Field
            name="email"
            component={RenderTextField}
            label="Email *"
            type="email"
            margin="normal"
            variant="outlined"
            disabled={isLoading}
          />
        </Grid>

        <Grid item xs={12}>
          <Field
            name="password"
            component={RenderPasswordField}
            label="Password *"
            margin="normal"
            variant="outlined"
            disabled={isLoading}
          />
        </Grid>

        <Grid item xs={12} className="flex justify-center">
          <Button variant="contained" type="submit" color="primary">
            {t('Access account')}
          </Button>
          &nbsp;
          <Button component={Link} to='/register' variant="outlined" type="button">
            {t('Create account')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export const FORM_NAME = 'LoginForm'; // a unique name for the form

// Create Redux Form
export default compose(
  reduxForm({
    form: FORM_NAME,
    destroyOnUnmount: false,
    validate,
  }),
  withStyles(styles),
)(LoginForm);
