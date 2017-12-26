import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchPosts } from '../actions/index';
import Spinner from './spinner';

import '../style/post_index.css';

class PostIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.map(post => {
      return (
        <div className="col-md-12 post" key={post.id}>
          <div className="user-block">
            <img className="img-circle img-bordered-sm" src={post.userImg.thumbnailUrl} alt="user" />
            <span className="username">
              <span className="post-user">{post.user.name}</span>
            </span>
            <span className="description">Shared publicly - 7:30 PM today</span>
          </div>
          <h3 className="post-title">{post.title}</h3>
          <p className="post-extract">{post.body}</p>
          <ul className="list-inline">
            <li>
              <Link to={`post/${post.id}`} className="text-sm post-more">Read more</Link>
            </li>
          </ul>
        </div>
      );
    });
  }

  render() {
    if (this.props.posts.length === 0) {
      return (
        <Spinner />
      );
    }
    return (
      <div className="row">
        {this.renderPosts()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.all
  };
}

export default connect(mapStateToProps, { fetchPosts })(PostIndex);