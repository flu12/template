import { Container } from '@material-ui/core';
import React, { Component, Fragment } from 'react';
import compose from 'lodash/fp/compose';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

// ******* Material UI dependencies ***************
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// ******* Own dependencies *******
import { authorizationConstants } from '../../constants/auth';
import LoginForm, { FORM_NAME as CREDENTIALS_FORM_NAME } from '../../components/auth/form/login';
import {withTranslation} from "react-i18next";
import NavigationBreadCrumbs from "../../components/common/navigationBreadcrumbs";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";


const HEADER_HEIGHT = 140;

const styles = (theme) => {
  return {
    // root: {
    //   width: '100%',
    //   margin: theme.spacing(7, 0),
    // },

  };
};

export class Login extends Component {
  render() {
    const { classes, isLoading, email, password, t } = this.props;

    return (
      <Container maxWidth="lg">
        <NavigationBreadCrumbs
          navItems={[
            { name: t('Access account'), path: '/login' }
          ]}
        />
        <Grid container className={classes.root} justify="center">
          <Grid item xs={11} sm={10} md={7} lg={6}>
            <Paper elevation={3}>
              <div className={classes.header}>
                <div>
                  <Paper elevation={8} style={{ height: HEADER_HEIGHT }}>
                    <div className="flex justify-center">
                      <img
                        src="/images/logo.png"
                        alt="ISHO"
                      />
                    </div>

                    <Typography
                      align="center"
                      component="h1"
                      variant="h5"
                      color="secondary"
                    >
                      {t('Access account')}
                    </Typography>
                  </Paper>
                </div>
              </div>
              <CardContent>

                <LoginForm
                  isLoading={isLoading === authorizationConstants.ON_LOGIN_INIT}
                  onSubmit={
                    (values) => {
                      // needs to pass validation
                      // generateLoginCode(values);
                    }
                  }
                  t={t}
                />

              </CardContent>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: formValueSelector(CREDENTIALS_FORM_NAME)(state, 'email'),
    password: formValueSelector(CREDENTIALS_FORM_NAME)(state, 'password'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onLogin: (data, history) => dispatch(onLogin(data, history)),

  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withTranslation(),
)(Login);
