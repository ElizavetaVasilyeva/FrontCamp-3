import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import Blogs from './blogs/blogs'
import Blog from './blog/blog'
import Create from './createBlog/create'
import Edit from './editBlog/edit'
import Login from './login/login'
import Register from './register/register'
import Index from './index'
import AuthRoute from './authRoute'
import { connect } from 'react-redux';

class AppRoutes extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        <AuthRoute isAuth={!isLoggedIn} path='/login' redirect='/' component={Login} />
        <AuthRoute isAuth={!isLoggedIn} path='/register' redirect='/' component={Register} />

        <AuthRoute isAuth={isLoggedIn} path='/blogs' redirect='/login' component={Blogs} />
        <AuthRoute isAuth={isLoggedIn} path='/edit/:id' redirect='/login' component={Edit} />
        <AuthRoute isAuth={isLoggedIn} path='/create' redirect='/login' component={Create} />
        <AuthRoute isAuth={isLoggedIn} path='/blog/:id' redirect='/login' component={Blog} />

        <Route exact path='/' component={Index} />
        <Redirect from='/*' to='/' />
      </Switch>
    )
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn
})

export default withRouter(connect(mapStateToProps)(AppRoutes));