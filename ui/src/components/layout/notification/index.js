import React, { Fragment } from 'react';
import compose from 'lodash/fp/compose';

// ***** Material UI dependencies ********
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Typography from '@material-ui/core/Typography';
import CloseIcon from 'mdi-material-ui/Close';
import ErrorIcon from 'mdi-material-ui/AlertCircle';
import SuccessIcon from 'mdi-material-ui/CheckCircle';
import WarningIcon from 'mdi-material-ui/AlertCircleOutline';
import { withStyles } from '@material-ui/core/styles';

import isString from 'lodash/isString';
import isObject from 'lodash/isObject';

import { notificationActions } from '../../../constants/notification';

const styles = theme => ({
  notificationIcon: {
    borderRadius: '50%',
    backgroundColor: theme.palette.background.default,
    width: 32,
    height: 32,
    boxShadow: theme.shadows[4],
    [theme.breakpoints.down('sm')]: {
      top: 0,
      position: 'relative',
    },
  },
  closeButton: {
    border: '2px #FFFFFF',
    boxShadow: theme.shadows[1],
    '& *': {
      color: `${theme.palette.background.default} !important`,
      fontWeight: 600,
    },
  },
  notificationSuccess: {
    color: theme.palette.secondary.main,
  },
  notificationWarning: {
    color: theme.palette.primary.main,
  },
  notificationError: {
    color: theme.palette.secondary.dark,
  },
  snackbarRoot: {
    backgroundColor: theme.palette.background.default,
    padding: 0,
    maxWidth: '95vw',
    [theme.breakpoints.up('md')]: {
      maxWidth: '55vw',
      right: 80,
    },
  },
  snackbarMessage: {
    padding: 0,
    width: '100%',
  },
  snackbarHeader: {
    // backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    minHeight: 44,
    padding: '6px 16px',
    '& span': {
      fontWeight: 600,
      marginLeft: theme.spacing(1),
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: 16,
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: -32,
    },
  },
  close: {
    color: `${theme.palette.background.primary} !important`,
    display: 'block',
  },
  snackbarContent: {
    // backgroundColor: '#FFFFFF',
    paddingBottom: `${theme.spacing(3)}px !important`,
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(1),
    '& *': {
      color: theme.palette.text.primary,
    },
    '& button': {
      marginTop: theme.spacing(1),
    },
    '& button svg': {
      width: 16,
      height: 16,
    },
  },
});

const NOTIFICATION_POSITION = {
  vertical: 'top',
  horizontal: 'right'
};
const NOTIFICATION_TIMEOUT = 3 * 1000;

const Notification = (props) => {
  const { classes, notification, onNotificationClose, t } = props;

  let notificationIcon;
  let notificationTitle;

  switch (notification.type) {
    case (notificationActions.NOTIFICATION_TYPES.SUCCESS):
      notificationIcon = <SuccessIcon classes={{root: `${classes.notificationIcon} ${classes.notificationSuccess}`}}/>;
      notificationTitle = t('Success');
      break;
    case (notificationActions.NOTIFICATION_TYPES.WARNING):
      notificationIcon = <WarningIcon classes={{root: `${classes.notificationIcon} ${classes.notificationWarning}`}}/>;
      notificationTitle = t('Warning');
      break;
    default:
      console.error(notification);
      notificationIcon = <ErrorIcon classes={{root: `${classes.notificationIcon} ${classes.notificationError}`}}/>;
      notificationTitle = t('Error');
      break;
  }

  let message = null;

  if (isString(notification.notification)) {
    message = (
      <Typography variant="subtitle2">
        { t(notification.notification) }
      </Typography>
    );
  }
  else if (isObject(notification.notification)) {
    message = notification.notification.message || notification.notification.errorMessage
  }

  return (
    <Snackbar
      open={!!(notification)}
      autoHideDuration={NOTIFICATION_TIMEOUT}
      anchorOrigin={NOTIFICATION_POSITION}
      onClose={onNotificationClose}
    >
      <SnackbarContent
        classes={{
          root: classes.snackbarRoot,
          message: classes.snackbarMessage,
        }}
        message={(
          <Fragment>
            <div className={classes.snackbarHeader}>
              { notificationIcon }
              <span className="fill-flex">{ notificationTitle }</span>
              <div>
                <IconButton size="small" onClick={onNotificationClose}>
                  <CloseIcon className={classes.close}/>
                </IconButton>
              </div>
            </div>

            <CardContent className={classes.snackbarContent}>
              <div>{ message }</div>
            </CardContent>
          </Fragment>
        )}
      />
    </Snackbar>
  );
};

export default compose(
  withStyles(styles)
)(Notification);

