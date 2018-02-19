import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './blog.css';
import Helper from '../../helpers/helper'
import Loader from 'react-loader'

class Blog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      blog: {},
      loaded: false
    };
  }

  componentDidMount() {
    fetch('/blogs/' + this.props.match.params.id)
      .then(res => res.json())
      .then(blog => {
        //setTimeout(this.setState({ blog, loaded: true }), 5000);
        this.setState({ blog, loaded: true });
      });
  }

  delete(id) {
    fetch('/blogs/' + id, {
      method: 'DELETE',
      mode: 'CORS',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.props.history.push("/blogs");
    }).catch(err => err);
  }

  render() {
    return (
      <Loader loaded={this.state.loaded}>
        <div>
          <h2> {this.state.blog.title}</h2>
          <div className="textCenter">
            <h3>Written by {this.state.blog.author} at {Helper.GetLocalDateString(this.state.blog.date)}</h3>
            <p>{this.state.blog.body}</p>
            <Link to={`/edit/${this.state.blog._id}`} className="button info">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.blog._id)} className="button red">Delete</button>
            <Link to="/blogs" className="button back"><span aria-hidden="true"></span> Back</Link>
          </div>
        </div>
      </Loader>
    );
  }
}

export default Blog;