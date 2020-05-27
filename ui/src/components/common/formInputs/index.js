import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// ******* Material UI dependencies **********
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import ToggleIcon from 'material-ui-toggle-icon';
import Visibility from 'mdi-material-ui/Eye';
import VisibilityOff from 'mdi-material-ui/EyeOff';
import compose from "lodash/fp/compose";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export const RenderTextField = (props) => {
	const {
		input, label, meta: { asyncValidating, touched, error, submitFailed }, displayErrorWhenNotTouched, required, variant, inputStyle,
		max, min, maxLength, minLength, type = 'text',
		...custom
	} = props;
	const { t } = useTranslation('translations');

	let helperText = !!((touched || displayErrorWhenNotTouched) && error && submitFailed) ? t(error) : null;

	if (maxLength) {
		helperText = (
			<span className="flex">
				<span className="fill-flex">{helperText}</span>

				<span>{input.value ? input.value.length : '0'}/{maxLength}</span>
			</span>
		);
	}

	const inputProps = {
		error: !!((touched || displayErrorWhenNotTouched) && error && submitFailed),
		helperText,
		fullWidth: true,
		required: !!required,
		label,
		type,
		variant,
		...input,
		...custom,
		inputProps: {
			style: inputStyle,
		}
	};

	if (minLength || min === 0) inputProps.inputProps.maxLength = minLength;
	if (maxLength || min === 0) inputProps.inputProps.maxLength = maxLength;
	if (min || min === 0) inputProps.inputProps.min = min;
	if (max || min === 0) inputProps.inputProps.max = max;
	if (custom.multiline && inputStyle) inputProps.style = inputStyle;
	if (inputProps.label) inputProps.label = t(inputProps.label);
  // if (inputProps.placeholder) inputProps.label = t(inputProps.placeholder);

	return (<TextField {...inputProps} />);
};

export const RenderPasswordField = (props) => {
	const [showValue, setShowValue] = useState(false);

	return (
		<RenderTextField
			{...props}
			type={showValue ? 'text' : 'password'}
			InputProps={{
				endAdornment: <InputAdornment position="end">
					<IconButton
						onClick={() => setShowValue(!showValue)}
					>
            <ToggleIcon
              on={showValue}
              onIcon={<Visibility />}
              offIcon={<VisibilityOff />}
            />
					</IconButton>
				</InputAdornment>,
			}}
		/>
	);
};

const useSelectStyles = makeStyles(() => {
  return {
    selectContainer: {
      maxHeight: 300,
    },
  };
});

export const RenderSelectField = (props) => {
  const {
    input, label,t, meta, required, options, disabled, displayErrorWhenNotTouched, variant = 'outlined', margin = "dense", hideNullValue,
    ...custom
  } = props;
  const {touched, error, submitFailed} = meta;
  // const { t } = useTranslation('translations');
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const classes = useSelectStyles();

  return (
    <FormControl disabled={disabled} error={!!((touched || displayErrorWhenNotTouched) && error && submitFailed)} variant={variant}
                 fullWidth margin={margin}>
      <InputLabel ref={inputLabel} shrink={!!input.value} required={required}>{t(label)}</InputLabel>

      <Select
        native
        labelWidth={labelWidth}
        {...input}
        {...custom}
        MenuProps={{
          onEnter: () => {
            setTimeout(() => {
              if (document.activeElement) {
                document.activeElement.blur();
              }
            }, 500);
          }
        }}
      >
        { hideNullValue ? null : <option value="" /> }
        {options.map((option, index) => (<option key={index} value={option.value}>{t(option.name)}</option>))}
      </Select>

      {!!((touched || displayErrorWhenNotTouched) && error) ? <FormHelperText>{t(error)}</FormHelperText> : null}
    </FormControl>
  );
};


export const RenderCheckbox = (props) => {
  const {
    input, label, disabled, color = 'secondary',
    // extract internationalisation props that could be added to the component
    t, tReady, classes, i18n, i18nOptions, defaultNS, reportNS, lng,
    ...custom
  } = props;
  return (
    <FormControlLabel
      control={
        <Checkbox
          color={color}
          checked={!!input.value}
          onChange={input.onChange}
          disabled={!!disabled}
          {...custom}
        />
      }
      label={typeof label === 'string' ? t(label) : label}
    />
  );
}

