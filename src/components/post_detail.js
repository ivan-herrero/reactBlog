import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import alertify from 'alertify.js';
import Clipboard from 'clipboard';

import logo from '../images/logo.svg';
import { fetchPost } from '../actions/index';
import { postComment } from '../actions/index';
import Spinner from './spinner';

import '../style/post_detail.css';

class PostDetail extends Component {
  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  componentDidMount() {
    new Clipboard('.post-share');
  }

  renderComments() {
    return this.props.post.comments.map(comment => {
      return (
        <div key={comment.id} className="post-comment box-comment">
          <img className="img-circle img-sm" src={logo} alt="user" />

          <div className="comment-text">
            <span className="username"> {comment.email}</span>
            <span className="post-comment-date text-muted">8:03 PM Today</span>
            <span className="post-comment-body">{comment.body}</span>
          </div>
        </div>
      );
    });
  }

  onSubmit(comment) {
    const { post, reset } = this.props;

    comment.postId = post.id;
    comment.email = 'guest';
    this.props.postComment(comment)
      .then(() => {
        reset();
      });
  }

  likePost(event) {
    event.target.classList.toggle("post-like-liked");
  }

  render() {
    const { post, handleSubmit } = this.props;

    if (!post) {
      return (
        <Spinner />
      );
    }

    return (
      <div className="col-md-12 post">
        <div className="user-block">
          <img className="img-circle img-bordered-sm" src={post.userImg.thumbnailUrl} alt="user" />
          <span className="username">
            <span className="post-user">{post.user.name}</span>
          </span>
          <span className="description">Shared publicly - 7:30 PM today</span>
        </div>
        <h3 className="post-title">{post.title}</h3>
        <p className="post-body">{post.body}</p>
        <ul className="list-inline">
          <li>
            <span
              onClick={() => alertify.success('Link copied to clipboard')}
              className="link-black text-sm post-share"
              data-clipboard-text={document.location.href}>
              <i className="fa fa-share margin-r-5"></i> Share
              </span>
          </li>
          <li>
            <span onClick={this.likePost} className="post-like link-black text-sm">
              <i className="fa fa-thumbs-o-up margin-r-5"></i> Like
            </span>
          </li>
          <li className="pull-right">
            <span className="text-sm">
              <i className="fa fa-comments-o margin-r-5"></i> Comments ({post.comments.length})
            </span>
          </li>
        </ul>

        <div className="box-footer box-comments">
          {this.renderComments()}
        </div>

        <div className="post-new-comment box-footer">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <img className="img-responsive img-circle img-sm" src={logo} alt="user" />
            <div className="img-push">
              <Field name="body" component="input" type="text" className="form-control input-sm" placeholder="Type a comment" autoComplete="off" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.body) {
    errors.body = 'Enter a comment';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    post: state.posts.current
  };
}

PostDetail = reduxForm({
  form: 'PostCommentForm',
  validate
})(PostDetail);

export default connect(mapStateToProps, { fetchPost, postComment })(PostDetail);