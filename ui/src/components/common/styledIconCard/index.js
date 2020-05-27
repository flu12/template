import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

const useStyles = (props) => (makeStyles((theme) => {
  const { iconSize } = props;
  const ICON_SIZE = iconSize || 70;
  return {
    container: {
      marginTop: theme.spacing(4),
    },
    cardHeader: {
      minHeight: 30,
      marginBottom: 4,
      position: 'relative',
    },
    content: {
      marginLeft: 80,
    },
    cardIcon: {
      background: `linear-gradient(60deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
      height: ICON_SIZE,
      width: ICON_SIZE,
      position: 'absolute',
      top: -32,
      '& >div': {
        height: ICON_SIZE,
        width: ICON_SIZE,
        padding: '0px !important',
      },
      '& svg': {
        color: '#FFFFFF',
        width: ICON_SIZE * 0.7,
        height: ICON_SIZE * 0.7,
      },
    }
  }
})());

const StyledIconCard = (props) => {
  const classes = useStyles(props);
  const { className, icon, title, action, children } = props;

  return (
    <Paper className={`${classes.container} ${className}`}>
      <CardContent>
        <div className={classes.cardHeader}>
          <Paper className={classes.cardIcon}>
            <CardContent
              className="flex justify-center align-center full-height"
            >
              { icon }
            </CardContent>
          </Paper>
          <div className={`${classes.content} flex align-center wrap-content`}>
            <Typography variant="h5" component="h1" color="textSecondary" className="fill-flex">
              { title }
            </Typography>
            &nbsp;
            {action}
          </div>
        </div>
        <br />
        {children}
      </CardContent>
    </Paper>
  );
};

StyledIconCard.propTypes = {
  icon: PropTypes.any.isRequired,
  iconSize: PropTypes.number.isRequired,
  title: PropTypes.any.isRequired,
  action: PropTypes.any,
  children: PropTypes.any.isRequired,
};

export default StyledIconCard;
