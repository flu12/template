import React, {Fragment} from "react";
import {compose} from 'redux';
import {connect} from 'react-redux';
import {useTranslation} from "react-i18next";

// ******* Own dependencies **********
import Sidenav from "./sidenav";
import Header from "./header";
import HeaderClient from './headerClient'
import Notification from "./notification"
import {toggleSidenav, toggleMenuHeader} from "../../actions/global";
import {onNotificationClose} from "../../actions/notifications";
import {USER_ROLES} from "../../constants/global";
import Alert from 'mdi-material-ui/Alert';

// ******* Material UI dependencies **********
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import {useTheme, withStyles} from '@material-ui/core/styles';
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import {Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";

export const HEADER_HEIGHT = 64;

const styles = (theme) => {
  return {
    warning: {
      padding: 16,
      backgroundColor: theme.palette.secondary.main,
      '& *': {
        color: '#FFFFFF',
      },
    },
    avatar: {
      marginRight: 8,
      border: '2px solid #FFFFFF',
    },
    mainContent: {
      // backgroundImage: 'url(\'/images/background.png\')',
      backgroundColor: '#EFEFEF',
      backgroundSize: 'cover',
      minHeight: '100vh',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      height: '100%',
      // paddingBottom: theme.spacing(2),
      // paddingTop: theme.spacing(2),
    },
  }
};

const Layout = (props) => {
  const {children, classes, menuHeaderOpened, toggleMenuHeader, toggleSidenav, sidenavOpened, userInfo, notification,
    onNotificationClose} = props;
  const { t } = useTranslation('translations');

  // determine if we need to offset the main content from the headerSidenav
  // headerSidenav is fixed as position with a height of 64 px
  // headerSidenav is visible when
  // 1. no users is logged in
  // 2. if the users is logged in but on a small device
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const isLoggedIn = !!userInfo;

  const headerHiddenProps = {};

  if (isLoggedIn) {
    headerHiddenProps.mdUp = true;
  }

  const mainContentStyles = {};

  if (!isLoggedIn || isSmallDevice || isLoggedIn && userInfo.userRoles.find(role => role === USER_ROLES.CLIENT)) {
    mainContentStyles.marginTop = HEADER_HEIGHT;
    mainContentStyles.backgroundImage ='url(\'/images/background.png\')';
  }

  return (
    <Fragment>
      <div className='flex'>
        {
          isLoggedIn && userInfo.userRoles.find(role => role === USER_ROLES.ADMIN) ?
            (
              <aside>
                <Sidenav
                  sidenavOpened={sidenavOpened}
                  toggleSidenav={toggleSidenav}
                  userInfo={userInfo}
                />
              </aside>
            )
            : null
        }

        <div className='fill-flex'>

          {
            isLoggedIn && userInfo.userRoles.find(role => role === USER_ROLES.CLIENT) ?
              (
                <HeaderClient
                  menuHeaderOpened={menuHeaderOpened}
                  toggleMenuHeader={toggleMenuHeader}
                  userInfo={userInfo}
                  t={t}
                />
              )
              :
              (
                <Hidden {...headerHiddenProps}>
                  <Header
                    toggleSidenav={toggleSidenav}
                    userInfo={userInfo}
                    t={t}
                  />
                </Hidden>
              )
          }

          <main
            className={classes.mainContent}
            style={mainContentStyles}
          >
            {
              userInfo && userInfo.userRoles.length && !userInfo.userRoles.find((role) => role === USER_ROLES.ADMIN) && !userInfo.ishoCard
                && moment().diff(userInfo.createdAt, "minutes") < 10 ?
                (
                  <Paper className={`flex align-center ${classes.warning}`} elevation={11}>
                    <div>
                      <Avatar className={classes.avatar}>
                        <Alert />
                      </Avatar>
                    </div>
                    <div>
                      {t("Felicitări! Contul dumneavoastră a fost creat. Veți fi notificat prin email când administratorul parcãrii vã va asocia un card ISHO pentru a vã putea abona.")}
                    </div>
                  </Paper>
                )
                :  userInfo && userInfo.userRoles.length && !userInfo.userRoles.find((role) => role === USER_ROLES.ADMIN) && !userInfo.ishoCard ?
                (
                  <Paper className={`flex align-center ${classes.warning}`} elevation={11}>
                    <div>
                      <Avatar className={classes.avatar}>
                        <Alert />
                      </Avatar>
                    </div>
                    <div>
                      {t("Cardul ISHO nu este asociat contului. Veți fi notificat prin email cand administratorul parcării îl va asocia.")}
                    </div>
                  </Paper>
                ) : null
            }
            {children}
          </main>
        </div>
      </div>

      {
        !!(notification) ?
          (
            <Notification
              notification={notification}
              onNotificationClose={onNotificationClose}
              t={t}
            />
          )
          : null
      }
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    sidenavOpened: state.global.sidenavOpened,
    menuHeaderOpened: state.global.menuHeaderOpened,
    userInfo: state.auth.userInfo,
    notification: state.notifications.notification,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidenav: () => dispatch(toggleSidenav()),
    toggleMenuHeader: (data) => dispatch(toggleMenuHeader(data)),
    onNotificationClose: () => dispatch(onNotificationClose()),
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(Layout);
