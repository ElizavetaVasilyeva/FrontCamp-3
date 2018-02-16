import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './blog.css';

class Blog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      blog: {}
    };
  }

  componentDidMount() {
    fetch('/blogs/' + this.props.match.params.id)
      .then(res => res.json())
      .then(blog => {
        this.setState({ blog });
      });
  }

  delete(id) {
    console.log(id);
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
      <div>
        <h2> {this.state.blog.title}</h2>
        <div className="textCenter">
          <h3>Written by {this.state.blog.author} at {new Date(this.state.blog.date).toLocaleDateString('en-US')}</h3>
          <p>{this.state.blog.body}</p>
          <Link to={`/edit/${this.state.blog._id}`} className="button info">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.blog._id)} className="button red">Delete</button>
          <Link to="/blogs" className="button back"><span aria-hidden="true"></span> Back</Link>
        </div>
      </div>
    );
  }
}

export default Blog;