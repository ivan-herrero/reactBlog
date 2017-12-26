import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostIndex from './components/post_index';
import PostDetail from './components/post_detail';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostIndex} />
    <Route path="post/:id" component={PostDetail} />
  </Route>
);