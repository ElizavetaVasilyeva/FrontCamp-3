import React, { Component } from 'react';
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';
import * as userActions from '../../store/actions/auth'
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return this.props.isLoggedIn ? < LoggedInNav /> : <LoggedOutNav />;
  }
}


const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn
})


const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(userActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);