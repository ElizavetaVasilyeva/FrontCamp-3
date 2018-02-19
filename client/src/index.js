import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/app/app'
import Blogs from './components/blogs/blogs'
import Blog from './components/blog/blog'
import Create from './components/createBlog/create'
import Edit from './components/editBlog/edit'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.hydrate(
  <Router>
    <div>
      <Route exact path='/' component={App} />
      <Route exact path='/blogs' component={Blogs} />
      <Route path='/edit/:id' component={Edit} />
      <Route path='/create' component={Create} />
      <Route path='/blog/:id' component={Blog} />
    </div>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
