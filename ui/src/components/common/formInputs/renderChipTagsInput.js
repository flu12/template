import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Chip,
  FormControl,
  FormHelperText,
  TextField,
  colors,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import {
  Add,
  Close,
} from '@material-ui/icons';
import clsx from "clsx";

const styles = (theme) => ({
  root: {
    '& label': {
      fontStyle: 'italic',
      color: colors.grey[500],
    },
  },
  addButton: {
    marginLeft: theme.spacing(1),
  },
  tags: {
    marginTop: theme.spacing(1),
  },
});

const useStyles = makeStyles(styles);

function RenderChipTagsInput(props) {
  const {
    input, label, meta, required, margin="dense", variant="outlined", TextFieldComponent, getTagLabel, hideAddButton,
  } = props;

  const [textValue, setTextValue] = useState('');
  const classes = useStyles();

  const onAdd = () => {
    const isExisting = inputValue.indexOf(textValue) !== -1;

    if (!isExisting && textValue) {
      onChange([...inputValue, textValue]);
    }

    setTextValue('');
  };

  useEffect(() => {
    if (textValue && TextFieldComponent) {
      onAdd();
    }
  }, [TextFieldComponent, textValue]);

  const {value, onChange} = input;
  const {touched, error} = meta;

  const hasError = !!(touched && error);

  // prevent null values for multiple functionality
  let inputValue = value;

  if (!inputValue) {
    inputValue = [];
  }

  const onDelete = (index) => {
    onChange([...inputValue.slice(0, index), ...inputValue.slice(index + 1)]);
  };

  return (
    <FormControl
      error={hasError}
      required={required}
      component="fieldset"
      fullWidth
    >
      <div className={clsx(classes.root, 'flex', 'align-center')}>
        <div
          className={clsx('fill-flex')}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
            }
          }}
        >
          {
            TextFieldComponent
              ? (
                <TextFieldComponent
                  onChange={(event) => setTextValue(event.target.value)}
                  value={textValue}
                  fieldProps={props}
                />
              )
              : (
                <TextField
                  onChange={(event) => setTextValue(event.target.value)}
                  value={textValue}
                  variant={variant}
                  label={label}
                  margin={margin}
                  fullWidth
                />
              )
          }
        </div>

        {
          hideAddButton
            ? null
            : (
              <Button
                className={classes.addButton}
                onClick={onAdd}
                size="small"
              >
                <Add />
                Add
              </Button>
            )
        }
      </div>

      <div className={classes.tags}>
        {inputValue.map((tag, index) => (
          <Chip
            deleteIcon={<Close />}
            key={tag}
            label={getTagLabel ? getTagLabel(tag) : tag}
            onDelete={() => onDelete(index)}
          />
        ))}
      </div>

      {hasError ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );
}

RenderChipTagsInput.propTypes = {
  className: PropTypes.string,
  getTagLabel: PropTypes.func,
  TextFieldComponent: PropTypes.any, // must have value and on change available
};

export default RenderChipTagsInput;
