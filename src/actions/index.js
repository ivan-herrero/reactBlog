import axios from 'axios';

export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_POST = "FETCH_POST";
export const FETCHING_POST = "FETCHING_POST";
export const POST_COMMENT = "POST_COMMENT";

const ROOT_URL = "https://jsonplaceholder.typicode.com";

export function fetchPosts() {
  const postsRequest = axios.get(`${ROOT_URL}/posts`);
  const usersRequest = axios.get(`${ROOT_URL}/users`);
  const photosRequest = axios.get(`${ROOT_URL}/photos`);

  return dispatch => {
    axios.all([postsRequest, usersRequest, photosRequest])
      .then(axios.spread((posts, users, photos) => {
        dispatch({
          type: FETCH_POSTS,
          payload: posts.data.map(post => {
            return {
              ...post,
              body: post.body.repeat(5),
              user: users.data.filter(user => user.id === post.userId)[0],
              userImg: photos.data.filter(photo => photo.id === post.userId)[0]
            };
          })
        });
      }));
  };
}

export function fetchPost(postId) {
  const postRequest = axios.get(`${ROOT_URL}/posts/${postId}`);

  return dispatch => {
    dispatch({
      type: FETCHING_POST,
    });

    postRequest.then(response => {
      const post = response.data;

      const userRequest = axios.get(`${ROOT_URL}/users/${post.userId}`);
      const photoRequest = axios.get(`${ROOT_URL}/photos/${post.userId}`);
      const commentsRequest = axios.get(`${ROOT_URL}/comments?postId=${post.id}`);

      axios.all([userRequest, photoRequest, commentsRequest])
        .then(axios.spread((user, photo, comments) => {
          dispatch({
            type: FETCH_POST,
            payload: {
              ...post,
              body: post.body.repeat(5),
              user: user.data,
              userImg: photo.data,
              comments: comments.data
            }
          });
        }));
    });
  };
}

export function postComment(comment) {
  const request = axios.post(`${ROOT_URL}/comments`, comment);

  return {
    type: POST_COMMENT,
    payload: request
  };
}