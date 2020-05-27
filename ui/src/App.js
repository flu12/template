import { DialogContent } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import React, { PureComponent, Suspense } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import {connect} from "react-redux";
import {isLoggedIn} from './actions/auth';
import {getAvailableRoutes} from "./routes";
import Layout from './components/layout';
import Loading from "./components/common/loading";
import {getLoginToken} from "./services/authService";

class App extends PureComponent {

  // componentWillMount() {
  //   const token = getLoginToken();
  //
  //   if (token) {
  //     this.props.isLoggedIn();
  //   }
  // }

  render() {
    const { userInfo } = this.props;

    const routes = getAvailableRoutes(userInfo);

    return (
      <Suspense fallback={<Loading /> }>
        {/*<Layout>*/}
          <Switch>
            {
              routes.map((route, index) => {
                const { path, component, } = route;
                return (<Route key={index} exact={true} path={path} component={component} />);
              })
            }

            {/*<Redirect from='*' to='/' />*/}
          </Switch>
        {/*</Layout>*/}
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  isLoggedIn: () => dispatch(isLoggedIn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


