import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

const useStyles = (props) => (makeStyles((theme) => {
  const { iconSize } = props;
  return {
    container: {
      marginTop: theme.spacing(2),
    },
    cardHeader: {
      minHeight: 30,
      position: 'relative',
      '& h5': {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: 10,
      },
    },
  }
})());

const StyledIconCard = (props) => {
  const classes = useStyles(props);
  const { icon, title, children } = props;

  return (
    <Paper className={classes.container}>
      <CardContent>
        <div className={classes.cardHeader}>
          <Typography variant="h5" className="h2" color="textSecondary">
            { title }
          </Typography>
        </div>
        <br />
        {children}
      </CardContent>
    </Paper>
  );
};

StyledIconCard.propTypes = {
  icon: PropTypes.any,
  iconSize: PropTypes.number,
  title: PropTypes.any,
  children: PropTypes.any,
};

export default StyledIconCard;
