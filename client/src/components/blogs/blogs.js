import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import * as blogActions from '../../store/actions/blog'
import './blogs.css';
import _ from 'lodash';

class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ''
    }
  }

  static propTypes = {
    getBlogs: PropTypes.func.isRequired,
    blogs: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.getBlogs();
  }

  onChange = (e) => {
    this.setState({ filter: e.target.value });
  }

  filterData = () => {
    return _.filter(this.props.blogs, (blog) => {
      return this.state.filter !== '' ? blog.author.toLowerCase()
        .includes(this.state.filter.toLowerCase()) : blog
    })
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
          {_.map(this.filterData(), (blog) => {
            return (
              <li key={blog._id}>
                <p>
                  <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                  <span className='author'>({blog.author})</span></p>
              </li>
            )
          })
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blogs: state.blogs
})

const dispatchToProps = (dispatch) => ({
  getBlogs: () => dispatch(blogActions.getBlogs())
})

export default connect(mapStateToProps, dispatchToProps)(Blogs);
