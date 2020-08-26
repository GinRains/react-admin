import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import {Spin} from 'antd'

import { constantRoutes } from "@conf/routes";
import "./index.less"

class PublicLayout extends Component {
  renderRoute = (routes) => {
    return routes.map((route) => {
      return (
        <Route
          key={route.path}
          path={route.path}
          component={route.component}
          exact={true}
        />
      );
    });
  };

  render() {
    return (
      <Suspense fallback={
        <div className="example">
          <Spin />
        </div>}>
        <Switch>{this.renderRoute(constantRoutes)}</Switch>
      </Suspense>
    );
  }
}

export default PublicLayout;
