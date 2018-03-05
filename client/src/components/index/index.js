import React from 'react';
import { Link } from 'react-router-dom';

const Index = () =>
  <div>
    <div className="textCenter">
      <h1>Welcome to Blogs APP</h1>
      <span>Blogs App provides a big amount of articles all over the world.</span>
      <br /><br />
      <Link to="/blogs">
        <button type="button">
          Show Blogs
                </button>
      </Link>
    </div>
  </div>

export default Index;