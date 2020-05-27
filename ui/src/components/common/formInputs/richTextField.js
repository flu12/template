/**
 * Created by vladtomsa on 2019-04-12
 * Allow html input
 */
import React, { Component } from 'react';
import compose from 'lodash/fp/compose';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const styles = (theme) => {
  return {
    rteContainer: {
      '& :focus-within, :hover': {
        '& .ql-toolbar': {
          maxHeight: 400,
          opacity: 1,
          padding: 8,
        },
      },
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.action.disabled}`,
      borderRadius: 6,
      '& label': {
        fontSize: '0.85rem',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
      },
      '& select': {
        boxShadow: theme.shadows[1],
        color: 'rgba(0,0,0,0.4) !important',
        outline: 'none !important',
      },
      '& .ql-toolbar': {
        [theme.breakpoints.up('md')]: {
          maxHeight: 0,
          opacity: 0,
          padding: '0 8px',
          transition: 'all 0.5s ease-in-out',
        },
        '& *': {
          color: `${theme.palette.text.primary}`,
          stroke: `${theme.palette.text.primary}`,
        },
        '& button': {
          outline: 'none',
          '& :hover': {
            outline: 'none',
            color: `${theme.palette.secondary.main} !important`,
          },
        },
      },
      '& .ql-toolbar, .ql-container': {
        border: 'none !important',
      },
      '& .ql-snow .ql-picker-options': {
        background: theme.palette.background.paper,
      },
      '& .ql-container': {
        borderBottom: `1px solid ${theme.palette.divider}`,
        '& :focus': {
          borderBottomColor: `${theme.palette.secondary.main}`,
        },
      },
      '& .ql-editor': {
        minHeight: 90,
        maxHeight: '60vh',
      },
      '& .ql-editor.ql-blank::before': {
        color: theme.palette.text.primary,
      },
      '& .ql-active': {
        color: `${theme.palette.secondary.main} !important`,
        stroke: `${theme.palette.secondary.main} !important`,
        '& *': {
          color: `${theme.palette.secondary.main} !important`,
          stroke: `${theme.palette.secondary.main} !important`,
        },
        '& svg': {
          '& *': {
            stroke: `${theme.palette.secondary.main} !important`,
          },
        }
      },
    },
    error: {
      color: theme.palette.error.main,
      marginLeft: 8,
    },
  };
};

const TOOLBAR_CONFIG = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image'],
  ],
};

class RenderRichTextField extends Component {
  render() {
    const { input, classes, meta, label, placeholder, required, t } = this.props;
    const { touched, error } = meta;
    const { value, onBlur, onChange } = input;

    return (
      <div className={classes.rteContainer}>
        {
          label
            ? <InputLabel required={required} error={!!(touched && error)}>{label}</InputLabel>
            : null
        }

        <ReactQuill
          placeholder={placeholder}
          theme="snow"
          modules={TOOLBAR_CONFIG}
          value={value}
          onChange={(value) => {
            onChange(value);
            onBlur();
          }}
        />

        {
          !!(touched && error) ?
            <Typography className={classes.error} variant="caption">
              {t(error)}
            </Typography> : null
        }
      </div>
    );
  };
}

export default compose(
  withStyles(styles),
)(RenderRichTextField);
