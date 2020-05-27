import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import { withRouter } from "react-router-dom";

// ****** Own components *********
import {logout} from "../../../actions/auth";

// ******* Material UI dependencies **********
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from "mdi-material-ui/ExitToApp";
import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import {withStyles} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';

const styles = (theme) => ({
});

const MenuHeader = (props) => {
  const {logout, history,  menuHeaderOpened, toggleMenuHeader, classes, t} = props;

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={event => toggleMenuHeader(event.currentTarget)}>
        {t('Menu')}
      </Button>

      {/*<ListItem*/}
      {/*  button*/}
      {/*  onClick={event => toggleMenuHeader(event.currentTarget)}*/}
      {/*>*/}
      {/*  <ListItemIcon>*/}
      {/*    <PersonIcon />*/}
      {/*  </ListItemIcon>*/}
      {/*</ListItem>*/}

      <Menu
        id="fade-menu"
        anchorEl={menuHeaderOpened}
        keepMounted
        open={!!(menuHeaderOpened)}
        onClose={() => toggleMenuHeader(null)}
        TransitionComponent={Fade}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {/*<ListItem*/}
        {/*  button*/}
        {/*  component={NavLink}*/}
        {/*  to='/'*/}
        {/*>*/}
        {/*  <ListItemIcon>*/}
        {/*    <AccountBoxIcon fontSize="small" />*/}
        {/*  </ListItemIcon>*/}
        {/*  <ListItemText primary={t('Profile')} />*/}
        {/*</ListItem>*/}

        <ListItem
          button
          component={NavLink}
          to='/profile'
          onClick={()  => toggleMenuHeader()}
        >
          <ListItemIcon>
            <AccountBoxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('Profile')} />
        </ListItem>

        <ListItem
          button
          component={NavLink}
          to='/subscriptions'
          onClick={()  => toggleMenuHeader()}
        >
          <ListItemIcon>
            <SubscriptionsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('Subscriptions')} />
        </ListItem>

        <ListItem
          button
          onClick={()  => {
            logout(history)
            toggleMenuHeader()
          }}
          >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>

      </Menu>
    </div>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    logout: (history) => dispatch(logout(history)),
  }
};

export default withRouter(compose(
  connect(null, mapDispatchToProps),
  withStyles(styles),
)(MenuHeader));
