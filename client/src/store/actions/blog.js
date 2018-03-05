import { BLOGS } from './constants';

export const getBlogs = () => dispatch => {
  return fetch('/blogs')
    .then(res => res.json())
    .then(blogs => dispatch({ type: BLOGS.GET_BLOGS, payload: blogs }))
}

export const getBlog = (id) => dispatch => {
  return fetch('/blogs/' + id)
    .then(res => res.json())
    .then(blog => dispatch({ type: BLOGS.GET_BLOG, payload: blog }))
}

export const deleteBlog = (id, callback) => dispatch => {
  fetch('/blogs/' + id, {
    method: 'DELETE',
    mode: 'CORS',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    callback();
    dispatch({ type: BLOGS.DELETE_BLOG, payload: id })
  })
}

export const createBlog = (values, callback) => dispatch => {
  fetch('/blogs', {
    method: 'POST',
    mode: 'CORS',
    body: values,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => {
      callback();
      dispatch({ type: BLOGS.CREATE_BLOG, payload: res })
    })
}

export const editBlog = (id, values, callback) => dispatch => {
  console.log(values);
  fetch('/blogs/' + id, {
    method: 'PUT',
    mode: 'CORS',
    body: values,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => {
      callback();
      dispatch({ type: BLOGS.EDIT_BLOG, payload: res });
    })
}


