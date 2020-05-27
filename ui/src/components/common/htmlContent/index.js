/**
 * Created by vladtomsa on 2019-04-16
 * Global component responsible for rendering external content
 * mapping it to our custom style
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import parse from 'html-react-parser';
import isArray from 'lodash/isArray';

const styles = (theme) => {
  const INDENT_SPACING = 4;
  return {
    root: {
      '& h2': {
        margin: theme.spacing(1, 0, 3),
      },
      '& h3': {
        margin: theme.spacing(1, 0),
      },
      '& h4': {
        margin: `${theme.spacing(0.25)}px 0`,
      },
      '& h5': {
        margin: `${theme.spacing(0.15)}px 0`,
        fontWeight: 500,
      },
      '& pre': {
        margin: 0,
      },
      '& img': {
        boxShadow: theme.shadows[2],
        display: 'flex',
        margin: '0 auto',
        maxWidth: '100%',
      },
      '& .ql-indent-1': {
        marginLeft: theme.spacing(INDENT_SPACING),
      },
      '& .ql-indent-2': {
        marginLeft: theme.spacing(2 * INDENT_SPACING),
      },
    },
    card: {
      background: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      padding: theme.spacing(2),
      margin: `${theme.spacing(2)}px 0`,
    }
  }
};

const HtmlContent = ({ classes, content, idKey }) => {
  const reactContent = parse(content);

  const generateContent = (element) => {
    const {
      key,
      type,
      props = {},
    } = element;

    const { children, className } = props;

    const elementProps = {
      key,
      className,
    };

    if (idKey) {
      elementProps.id = `${idKey}-${key}`;
    }

    switch (type) {
      case ('h1'):
        return (
          <Typography variant="h3" component="h2" gutterBottom {...elementProps}>
            {children}
          </Typography>
        );
      case ('h2'):
        return (
          <Typography variant="h3" gutterBottom {...elementProps}>
            {children}
          </Typography>
        );
      case ('h3'):
        return (
          <Typography variant="h4" gutterBottom {...elementProps}>
            {children}
          </Typography>
        );
      case ('h4'):
        return (
          <Typography variant="h5" gutterBottom {...elementProps}>
            {children}
          </Typography>
        );
      case ('p'):
        return (
          <Typography gutterBottom {...elementProps}>
            {children}
          </Typography>
        );
      case ('li'):
        return (
          <Typography component={type} gutterBottom {...elementProps}>
            {children}
          </Typography>
        );
      case ('ol'):
        return (
          <ol {...elementProps}>
            {
              children && children.length
                ? (
                  children.map((childElement) => generateContent({
                    ...childElement,
                    key: `${key}-${childElement.key}`
                  }))
                )
                : children
            }
          </ol>
        );
      case ('ul'):
        return (
          <ul {...elementProps}>
            {
              children && children.length
                ? (
                  children.map((childElement) => generateContent({
                    ...childElement,
                    key: `${key}-${childElement.key}`
                  }))
                )
                : children
            }
          </ul>
        );
      case ('pre'):
        return (
          <Card className={classes.card} key={key}>
            <pre>{children}</pre>
          </Card>
        );
      default:
        return (
          <Fragment key={key}>
            { element }
          </Fragment>
        );
    }
  };

  return (
    <div className={classes.root}>
      {/* We allow creation of a single element content  */}
      {
        reactContent
          ? (
            reactContent.length && isArray(reactContent)
              ? (
                reactContent.map((element) => {
                  return generateContent(element)
                })
              )
              : generateContent(reactContent)
          )
          : null

      }
    </div>
  );
};

HtmlContent.propTypes = {
  idKey: PropTypes.string, // if provided each element will have an id combined from the provided string
  classes: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
};

export default withStyles(styles)(HtmlContent);
