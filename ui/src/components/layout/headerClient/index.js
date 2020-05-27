import { Container } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import ExitToAppIcon from 'mdi-material-ui/ExitToApp';
import React, { PureComponent } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import compose from 'lodash/fp/compose';
import { logout } from '../../../actions/auth';

// ****** Own components *********
import MenuHeader from '../menuHeader';

// ******* Material UI dependencies **********
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  menuButton: {
    // color: '#FFFFFF',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  logo: {
    height: 50,
    width: 'auto',
  },
});

class HeaderClient extends PureComponent {

  render() {
    const { classes, menuHeaderOpened, logout, history,  toggleMenuHeader, t } = this.props;

    return (
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar>
            <div className='flex wrap-content align-center'>
              <Link to="/">
                <img
                  className={classes.logo}
                  src="/images/logo.png"
                  alt="ISHO_LOGO"
                />
              </Link>
            </div>

            <span className="fill-flex">&nbsp;</span>

            <Hidden xsDown>
              <Button
                color="secondary"
                component={NavLink}
                to='/profile'
              >
                {t('Profil')}
              </Button>



              <Button
                component={NavLink}
                to='/subscriptions'
                color="secondary"
              >
                {t('Subscriptions')}
              </Button>

              <Button
                onClick={() => logout(history)}
                color="secondary"
                startIcon={<ExitToAppIcon />}
              >
                Logout
              </Button>
            </Hidden>

            <Hidden smUp>
              <MenuHeader
                menuHeaderOpened={menuHeaderOpened}
                toggleMenuHeader={toggleMenuHeader}
                t={t}
              />
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(null, (dispatch) => ({
    logout: (history) => dispatch(logout(history)),
  }))
)(HeaderClient);
