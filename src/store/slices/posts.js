import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import db from '../../utils/db';
import faker from 'faker';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (page = 1) => {
  return await db.table('posts')
      .reverse()
      .sortBy('date');
});

export const fetchSinglePost = createAsyncThunk('posts/fetchSinglePost', async (postId) => {
  return await db.table('posts').filter(p => p.id == postId).first();
});

export const addPost = createAsyncThunk('posts/addPost', async ({ title, content }) => {
  const author = faker.name.findName();
  const payload = { title, content, author, date: Date.now() };
  const postId = await db.table('posts').add(payload);
  const createdPost = await db.table('posts').get(postId);

  return createdPost;
});

export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    collection: {
      data: [],
      status: 'loading'
    },
    post: {
      entity: {},
      status: 'loading'
    },
    error: null
  },
  reducers: {

  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.collection.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.collection.status = 'succeeded';
      state.collection.data = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.collection.status = 'failed';
      state.error = action.error.message;
    },
    [addPost.pending]: (state, action) => {
      state.collection.status = 'loading';
    },
    [addPost.fulfilled]: (state, action) => {
      state.collection.status = 'succeeded';
      state.collection.data = [{...action.payload}, ...state.collection.data];
    },
    [addPost.rejected]: (state, action) => {
      state.collection.status = 'failed';
      state.error = action.error.message;
    },
    [fetchSinglePost.pending]: (state, action) => {
      state.post.status = 'loading';
    },
    [fetchSinglePost.fulfilled]: (state, action) => {
      state.post.status = 'succeeded';
      state.post.entity = { ...action.payload };
    },
    [fetchSinglePost.rejected]: (state, action) => {
      state.post.status = 'failed';
      state.error = action.error.message;
    }
  }
});

export default postSlice.reducer;