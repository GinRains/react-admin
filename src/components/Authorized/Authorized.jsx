import React, {Component} from 'react';
import {connect} from 'react-redux'

import {getMenuList, getUserInfo} from './redux'

@connect(state =>
  ({user: state.user}),
  {getMenuList, getUserInfo}
  )
class Authorized extends Component {
  async componentDidMount() {
    const {getMenuList, getUserInfo} = this.props

    await Promise.all([getMenuList(), getUserInfo()])
  }

  render() {
    return this.props.render(this.props.user.permissionList);
  }
}

export default Authorized;
