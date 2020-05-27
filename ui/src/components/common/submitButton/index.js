/**
 * Created by vladtomsa on 2019-04-15
 * Form submit button with progress indicator based on 'isLoading' prop
 */
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';

const SubmitButton = ({
  color = 'primary', className = '', disabled, icon, variant = 'contained', type = 'submit', message = 'Submit', size = 'medium',
  onClick, isLoading,
}) => {
  const { t } = useTranslation('translations');

  const buttonProps = {
    className,
    size,
    color,
    type,
    variant,
    disabled: disabled || isLoading,
  };

  if (onClick) buttonProps.onClick = onClick;

  return (
    <Fragment>
      <Button {...buttonProps}>
        <span className="flex align-center">
          {t(message)}
          {
            isLoading
              ? (
                <Fragment>
                  &nbsp;
                  <CircularProgress color="secondary" size={16}/>
                </Fragment>
              )
              : null
          }
          {
            icon ? icon : null
          }
        </span>
      </Button>
    </Fragment>
  );
};

SubmitButton.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
  className: PropTypes.any,
  disabled: PropTypes.any,
  variant: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  isLoading: PropTypes.any,
  message: PropTypes.string,
  icon: PropTypes.any,
};

export default SubmitButton;

