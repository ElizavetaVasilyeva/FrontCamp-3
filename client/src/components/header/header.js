import React, { Component } from 'react';
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';
import * as userActions from '../../store/actions/auth'
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    if (this.props.isLoggedIn)
      return (
        <LoggedInNav />
      )
    else {
      return (
        <LoggedOutNav />
      )
    }
  }
}


const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn
})


const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(userActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);