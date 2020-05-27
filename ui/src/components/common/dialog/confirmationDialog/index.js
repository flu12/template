/**
 * Created by vladtomsa on 2019-04-22
 */
import React from 'react';
import PropTypes from 'prop-types';
import {useTranslation} from "react-i18next";
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '../dialogTitle';
import SubmitButton from '../../submitButton';
import HelpCircle from 'mdi-material-ui/HelpCircle';

const ConfirmationDialog = (
  { isLoading, disabled, message, onClose, onSubmit, closeMessage = 'Cancel', submitMessage = 'Confirm', open, title }
) => {
  const { t } = useTranslation('translations');

  return (
    <Dialog
      open={!!open}
      onClose={onClose}
      maxWidth="xs"
    >
      <DialogTitle
        onClose={onClose}
        title={
          <span className="flex align-center">
            <HelpCircle/>&nbsp;{title}
          </span>
        }
        t={t}
      />

      <DialogContent dividers>
        <br />
        {
          typeof message === 'string'
            ? <Typography variant="subtitle1">{t(message)}</Typography>
            : message
        }
        <br />
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={onClose}>
          { t(closeMessage) }
        </Button>
        &nbsp;
        <SubmitButton
          onClick={onSubmit}
          disabled={isLoading}
          message={submitMessage}
        />
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  isLoading: PropTypes.any,
  message: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  closeMessage: PropTypes.string,
  submitMessage: PropTypes.string,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default ConfirmationDialog;
