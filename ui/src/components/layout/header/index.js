import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// ******* Material UI dependencies **********
import AppBar from '@material-ui/core/AppBar';
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import { HEADER_HEIGHT } from '../index';

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

class Header extends PureComponent {

  render() {
    const { classes, t, toggleSidenav, userInfo } = this.props;

    const isLoggedIn = !!userInfo;

    return (
      <AppBar position="fixed">
        <Toolbar style={{ minHeight: HEADER_HEIGHT }}>
          <Container maxWidth="lg">
            <div className='flex wrap-content align-center'>
              <Link to="/">
                <img
                  className={classes.logo}
                  src="/images/logo.png"
                  alt="ISHO_LOGO"
                />
              </Link>

              <span className="fill-flex">&nbsp;</span>

              {
                isLoggedIn
                  ? (
                    <IconButton
                      color="secondary"
                      onClick={toggleSidenav}
                      className={classes.menuButton}
                    >
                      <MenuIcon />
                    </IconButton>
                  )
                  :
                  (
                    <Button component={Link} to="/login" color="secondary">
                      {t('Access account')}
                    </Button>
                  )
              }
            </div>
          </Container>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  toggleSidenav: PropTypes.func.isRequired,
  userInfo: PropTypes.any,
  t: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
