import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './blogs.css';


class Blogs extends Component {
  constructor() {
    super();
    this.state = {
      blogs: [],
      filter: ''
    };
  }

  componentDidMount() {
    fetch('/blogs')
      .then(res => res.json())
      .then(blogs => {
        this.setState({ blogs }, () => {
          console.log('Blogs fetched...', blogs)
        })
      }
      );
  }

  onChange = (e) => {
    this.setState({ filter: e.target.value });
  }

  render() {
    return (
      <div>
        <h2> All Blogs</h2>
        <h4><Link className="button green" to="/create"><span aria-hidden="true"></span> Add Blog</Link></h4>
        <br />
        <div className="filter">
          <label>Filter by author:</label>&nbsp;
                    <input type="text" className="filter" value={this.state.filter} onChange={this.onChange} />
        </div>
        <br />
        <ul>
          {this.state.blogs.filter(blog => this.state.filter !== '' ? blog.author.toLowerCase().includes(this.state.filter.toLowerCase()) : blog).map((blog) =>
            <li key={blog._id}>
              <p><Link to={`/blog/${blog._id}`}>{blog.title}</Link> <span className='author'>({blog.author})</span></p>
            </li>
          )
          }
        </ul>
      </div>
    );
  }
}

export default Blogs;
