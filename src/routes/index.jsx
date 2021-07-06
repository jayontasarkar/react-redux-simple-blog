import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import PostList from '../containers/post-list';
import PostShow from '../containers/post-show';
import NotFound from '../containers/not-found';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/posts" component={PostList} />
      <Route exact path="/posts/:postId" component={PostShow} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect exact from="/" to="/posts" />
      <Redirect to="/not-found" />
    </Switch>
  );
}

export default Routes;