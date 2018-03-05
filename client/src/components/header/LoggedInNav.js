import React, { Component } from 'react';
import logo from '../../static/logo.svg';
import * as userActions from '../../store/actions/auth'
import { connect } from 'react-redux';

class LoggedInNav extends Component {
  render() {
    return (
      <nav className="demo">
        <a className="brand" href="/">
          <img src={logo} className="App-logo" alt="logo" />
          <span>BLOGS APP</span>
        </a>
        <input id="bmenub" type="checkbox" className="show" />
        <label htmlFor="bmenub" className="burger pseudo button">menu</label>

        <div className="menu">
          <p>Welcome, {this.props.auth.username} &nbsp;
                    <a id="logout" className="button icon-puzzle" onClick={this.props.onLogout}>Logout</a></p>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})


const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(userActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInNav);



