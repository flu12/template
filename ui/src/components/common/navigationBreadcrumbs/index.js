import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import MaterialLink from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(theme => ({
  root: {
    '& a': {
      fontSize: '0.9rem'
    },
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 26,
  },
}));

const NavigationBreadCrumbs = (props) => {
  const classes = useStyles();
  const {navItems} = props;

  return (
    <Breadcrumbs className={classes.root}>
      <MaterialLink color="inherit" component={Link} to="/" className="flex align-center">
        <HomeIcon className={classes.icon}/>
        ISHO Parkings
      </MaterialLink>

      {
        navItems.map((navItem, index) => (
          <MaterialLink
            key={index}
            color={index === navItems.length - 1 ? 'textPrimary' : 'inherit'}
            component={Link}
            to={navItem.path}
          >
            {navItem.name}
          </MaterialLink>
        ))
      }
    </Breadcrumbs>
  );
};

NavigationBreadCrumbs.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired,
};

export default NavigationBreadCrumbs;
