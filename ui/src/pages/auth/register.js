import React, { Component, Fragment } from 'react';
import compose from 'lodash/fp/compose';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

// ******* Material UI dependencies ***************
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// ******* Own dependencies *******

import { authorizationConstants } from '../../constants/auth';
import { onRegister } from '../../actions/auth'
import RegisterForm from '../../components/auth/form/register';
import NavigationBreadCrumbs from "../../components/common/navigationBreadcrumbs";

const HEADER_HEIGHT = 140;

const styles = (theme) => {
  const HEADER_PADDING = theme.spacing(2);

	return {
	  root: {
      width: '100%',
      margin: theme.spacing(7, 0),
    },
    header: {
      position: 'relative',
      height: HEADER_HEIGHT - 30,
      '&>div': {
        height: HEADER_HEIGHT,
        width: '94%',
        left: '3%',
        position: 'absolute',
        top: -2 * HEADER_PADDING,
        '& >div': {
          backgroundColor: theme.palette.primary.main,
        },
      },
      '& img': {
        height: 80,
        width: 'auto'
      },
      '& h1': {
        fontWeight: 300,
      },
    },
  };
};

export class Register extends Component {
	render() {
		const { classes, history, isLoading, onRegister, t } = this.props;

		return (
			<Container maxWidth="lg">
        <NavigationBreadCrumbs
          navItems={[
            { name: t('Create account'), path: '/register' }
          ]}
        />

        <Grid container className={classes.root} justify="center" alignItems="center">
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
                      {t('Create account')}
                    </Typography>
                  </Paper>
                </div>
              </div>
              <CardContent>
                <RegisterForm
                  isLoading={isLoading === authorizationConstants.ON_REGISTER_INIT}
                  // onSubmit={(values) => onRegister(values, history)}
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

const mapDispatchToProps = (dispatch) => {
	return {
		onRegister: (data, history) => dispatch(onRegister(data, history)),
	}
};

export default compose(
	connect(null, mapDispatchToProps),
	withStyles(styles),
  withTranslation(),
)(Register);
