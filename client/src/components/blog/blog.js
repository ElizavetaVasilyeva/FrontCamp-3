import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './blog.css';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import * as blogActions from '../../store/actions/blog'
import Helper from '../../helpers/helper'
import Loader from 'react-loader'

class Blog extends Component {

  static propTypes = {
    getBlog: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired
  }

  static defaultProps = {
    blog: {}
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBlog(id);
  }

  delete(id) {
    this.props.deleteBlog(id, () => {
      this.props.history.push('/blogs');
    });
  }

  render() {
    return (
      <Loader loaded={this.props.blog}>
        <div>
          <h2> {this.props.blog.title}</h2>
          <div className="textCenter">
            <h3>Written by {this.props.blog.author} at {Helper.GetLocalDateString(this.props.blog.date)}</h3>
            <p>{this.props.blog.body}</p>
            {this.props.blog.author === this.props.username &&
              <fieldset>
                <Link to={`/edit/${this.props.blog._id}`} className="button info">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.props.blog._id)} className="button red">Delete</button>
              </fieldset>
            }
            <Link to="/blogs" className="button back"><span aria-hidden="true"></span> Back</Link>
          </div>
        </div>
      </Loader>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  blog: state.blogs[ownProps.match.params.id],
  username: state.auth.username
})


const mapDispatchToProps = (dispatch) => ({
  getBlog: (id) => dispatch(blogActions.getBlog(id)),
  deleteBlog: (id, callback) => dispatch(blogActions.deleteBlog(id, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(Blog);