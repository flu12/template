/**
 * Created by vladtomsa on 2019-05-10
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'lodash/fp/compose';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import clsx from 'clsx';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { withTranslation} from "react-i18next";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    // maxHeight: 250,
    // '& label': {
    //   '&[data-shrink=false]': {
    //     top: -4,
    //   },
    // },
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
    padding: 10.5,
    '& p': {
      marginLeft: 6,
    },
    '& >div': {
      margin: 0,
      padding: 0,
    },
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 9999,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
});

const NoOptionsMessage = (props) => {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
};

const inputComponent = ({ inputRef, ...props }) => {
  return <div ref={inputRef} {...props} />;
};

const Control = (props) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="dense"
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.TextFieldProps}
    />
  );
};

const Option = (props) => {
  const option = typeof props.children === 'string'
    ? props.t(props.children)
    : props.children;

  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 600 : 400,
      }}
      {...props.innerProps}
    >
      { option }
    </MenuItem>
  );
};

const Placeholder = (props) => {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
};

const SingleValue = (props) => {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
};

const ValueContainer = (props) => {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
};

const MultiValue = (props) => {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
};

const Menu = (props) => {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
};

const components = (t) => ({
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option: (props) => <Option {...props} t={t}/>,
  Placeholder,
  SingleValue,
  ValueContainer,
});

const getOptionLabel = (value, options) => {
  const selectedOption = options.find(option => option.value === value);

  return selectedOption ? selectedOption.label : value;
};

const mapInputValueToSelectValue = (value, options) => {
  let selectValue;

  // multiple = true
  if (isArray(value)) {
    selectValue = value.map(v => {
      return { value: v, label: getOptionLabel(v, options) };
    });
  }
  // multiple = false
  else if (value) {
    selectValue = {
      value,
      label: getOptionLabel(value, options),
    };
  } else {
    selectValue = null;
  }

  return selectValue;
};

const extractInputValueFromSelectValue = (value) => {
  let newValue;

  // multiple = true
  if (isArray(value)) {
    newValue = value.map(v => v.value);
  }
  // multiple = false
  else if (isObject(value)) {
    newValue = value.value;
  } else if (value === null) {
    newValue = null;
  }

  return newValue;
};

class AutoComplete extends Component {
  state = {
    isFocused: false, // use this field to handle element height
  };

  /**
   * React select offers { value, label } as valid values
   * Extract the value from here and change the input value for redux-form field
   * In case we need to close the index.js after change call setIsFocused(false)
   * */
  onChange = (value) => {
    const { input: { onChange }, multiple } = this.props;
    if (!multiple) this.setIsFocused(false);
    onChange(extractInputValueFromSelectValue(value));
  };

  setIsFocused = (value) => {
    this.setState({ isFocused: value });
  };

  render() {
    const {
      allowCreate, classes, input, label, placeHolder = '', meta, multiple, required, disabled, options = [], t,
      ...custom
    } = this.props;
    const { isFocused } = this.state;
    const { onBlur, value } = input;
    const { touched, error } = meta;
    const showError = touched && error;

    const shringLabel = multiple
      ? !!(value && value.length || isFocused)
      : !!(value || isFocused);

    const helperText = showError
      ? error
      : null;

    const componentProps = {
      classes,
      options,
      components: components(t),
      TextFieldProps: {
        error: !!showError,
        label: label,
        helperText,
        InputLabelProps: {
          shrink: shringLabel,
        },
        // onFocus: (ev) => {
        //   onFocus(ev);
        //   // this.setIsFocused(true);
        // },
      },
      value: mapInputValueToSelectValue(value, options),
      onChange: this.onChange,
      onBlur: (ev) => {
        if (!value) {
          onBlur(ev);
        }
        this.setIsFocused(false);
      },
      onFocus: (ev) => {
        this.setIsFocused(true);
      },
      placeholder: placeHolder,
      isMulti: !!multiple,
      closeMenuOnSelect: !multiple,
      isClearable: true,
      noOptionsMessage: () => t('No options available')
    };

    return (
      <div className={classes.root}>
        <NoSsr>
          {
            allowCreate
              ? <Creatable {...componentProps}/>
              : <Select {...componentProps}/>
          }
        </NoSsr>
      </div>
    );
  }
}

AutoComplete.propTypes = {
  allowCreate: PropTypes.bool, // Allow users to create new values/ besides those added in options
  classes: PropTypes.object.isRequired,
  multiple: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.any.isRequired,
      value: PropTypes.any.isRequired,
      disabled: PropTypes.any,
    })
  ).isRequired,
};

export default compose(
  withTranslation(),
  withStyles(styles),
)(AutoComplete);
