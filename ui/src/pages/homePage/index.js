import { Container } from '@material-ui/core';
import moment from 'moment';
import React, {Fragment, Component} from 'react';
import groupBy from 'lodash/groupBy';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import { withRouter } from "react-router-dom";

// ******* Own dependencies **********


// ******* Material UI dependencies **********
import { withStyles } from "@material-ui/core/styles";


const styles = (theme) => {
  return {
    // logo: {
    //   height: 64,
    //   width: 'auto',
    // },
  };
};

class HomePage extends Component {
  async componentDidMount() {
    // const {getAllSpaces} = this.props;
    // getAllSpaces();
  }
  render() {
    const { classes, t} = this.props;

    return (
      <div>
        Hello World!!!
      </div>
    );
  }
}



const mapStateToProps = (state) => ({
  // spaces: state.spaces.spaces,
});

const mapDispatchToProps = (dispatch) => ({
  // addOnWaitingList: (data) => dispatch(addOnWaitingList(data)),
});

export default withRouter(compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(HomePage));



