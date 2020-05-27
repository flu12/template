import React from "react";
import Loader from 'react-loaders'
import 'loaders.css/src/animations/ball-spin-fade-loader.scss'
import {makeStyles, useTheme} from "@material-ui/core/styles";

const useStyles = makeStyles(() => {
  return {
    root: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
});

const Loading = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.root}>
      <div>
        <Loader type="ball-spin-fade-loader" color={theme.palette.primary.main}/>
      </div>
    </div>
  );
};

export default Loading;
