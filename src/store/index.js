import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/posts';
import commentReducer from './slices/comments';

export default configureStore({
  reducer: {
    posts: postReducer,
    comments: commentReducer,
  },
});