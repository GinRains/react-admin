import React from "react";
import { Router } from "react-router-dom";
import {IntlProvider} from 'react-intl'
import {connect} from 'react-redux'
import history from "@utils/history";
import {zh, en} from './locales'

import Layout from "./layouts";
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css";

function App(props) {
  const locale = props.lang
  const message = locale === "zh" ? zh : en

  return (
    <Router history={history}>
      <IntlProvider locale={locale} messages={message}>
        <Layout />
      </IntlProvider>
    </Router>
  );
}

export default connect(state => ({lang: state.lang}))(App);
