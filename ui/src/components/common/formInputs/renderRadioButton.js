import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  Checkbox,
} from '@material-ui/core';
import {
  CheckBox,
  CheckBoxOutlineBlank,
} from '@material-ui/icons';
import clsx from "clsx";

function RenderRadioGroup(props) {
  const {
    input, label, meta, required, className, options, multiple,
  } = props;

  const {value, onChange} = input;
  const {touched, error} = meta;

  const hasError = !!(touched && error);

  // prevent null values for multiple functionality
  let inputValue = value;
  if (multiple && !inputValue) {
    inputValue = [];
  }

  const handleMultipleValueFieldChange = (value) => {
    if (!Array.isArray(inputValue)) {
      return;
    }

    const isExistingIndex = inputValue.indexOf && inputValue.indexOf(value);
    const newValue = [...inputValue];
    if (isExistingIndex === -1) {
      newValue.push(value);
    }
    else {
      newValue.splice(isExistingIndex, 1);
    }

    onChange(newValue);
  };

  return (
    <FormControl
      error={hasError}
      required={required}
      component="fieldset"
      fullWidth
    >
      { label ? <FormLabel component="legend">{label}</FormLabel> : null }

      {
        multiple
          ? (
            <div className={clsx(className)}>
              {
                options.map(({ name, value}) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={!!inputValue.includes(value)}
                        onChange={() => handleMultipleValueFieldChange(value)}
                        checkedIcon={<CheckBox color="primary" />}
                        icon={<CheckBoxOutlineBlank />}
                      />
                    }
                    label={name}
                    key={name + value}
                  />
                ))
              }
            </div>
          )
          : (
            <RadioGroup
              className={clsx(className)}
              value={value}
              onChange={onChange}
            >
              {
                options.map(({
                               name,
                               value,
                               control = (
                                 <Radio
                                   color="secondary"
                                   checkedIcon={<CheckBox color="secondary" />}
                                   icon={<CheckBoxOutlineBlank />}
                                 />),
                               disabled,
                             }) => (
                  <FormControlLabel
                    key={name + value}
                    value={value}
                    disabled={!!disabled}
                    control={control}
                    label={name}
                  />
                ))
              }
            </RadioGroup>
          )
      }

      {hasError ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );
}

RenderRadioGroup.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array.isRequired,
  multiple: PropTypes.bool,
};

export default RenderRadioGroup;
