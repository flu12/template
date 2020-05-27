import React from "react";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import { useTranslation } from 'react-i18next';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      margin: theme.spacing(1, 0, 2),
    },
  };
});

const PageTitle = (props) => {
  const { title } = props;
  const classes = useStyles();
  const { t } = useTranslation('translations');

  return (
    <Typography variant="h4" component="h1" color="textSecondary" className={classes.root}>
      {t(title)}
    </Typography>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
