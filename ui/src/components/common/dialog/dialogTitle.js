/**
 * Created by vladtomsa on 2019-04-23
 */
import React from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from "react-i18next";
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Close from 'mdi-material-ui/Close';

const styles = (theme) => {
  return {
    root: {
      backgroundColor: theme.palette.background.default,
      paddingRight: theme.spacing(2),
      '& h2': {
        display: 'flex',
      },
    },
    closeButton: {
      padding: 0,
      height: 32,
      width: 32,
    },
  };
};

const CustomDialogTitle = ({ classes, onClose, title }) => {
  const { t } = useTranslation('translations');

  return (
    <DialogTitle classes={{ root: classes.root }}>
      <span className="fill-flex">
        {
          typeof title === 'string'
            ? t(title)
            : title
        }
      </span>
      &nbsp;

      {
        onClose
          ? (
            <div>
              <Tooltip title={t('Cancel')}>
                <IconButton onClick={onClose} className={classes.closeButton}>
                  <Close />
                </IconButton>
              </Tooltip>
            </div>
          )
          : null
      }
    </DialogTitle>
  );
};

CustomDialogTitle.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.any,
};

export default withStyles(styles)(CustomDialogTitle);
