import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import db from '../../utils/db';
import { nestComments, addReplyForComment } from '../../utils/helpers';
import faker from 'faker';

export const fetchComments = createAsyncThunk('posts/fetchComments', async (postId) => {
  const comments = await db.table('comments')
      .filter(comment => comment.post == postId)
      .reverse()
      .sortBy('date');
  const nestedComments =  nestComments(comments);
  
  return nestedComments;
});

export const addComment = createAsyncThunk('posts/addComment', async ({ name, content, post }) => {
  const avatar = faker.image.avatar();
  const payload = { post, name, avatar, content, parent: null, date: Date.now() };
  const commentId = await db.table('comments').add(payload);
  const createdComment = await db.table('comments').get(commentId);

  createdComment.replies = [];
  return createdComment;
});

export const addReply = createAsyncThunk('posts/addReply', async ({ content, post, parent }) => {
  const avatar = faker.image.avatar();
  const name = faker.name.findName();
  const payload = { post, name, avatar, content, parent, date: Date.now() };
  const replyId = await db.table('comments').add(payload);
  const createdReply = await db.table('comments').get(replyId);
  createdReply.replies = [];

  return createdReply;
});

export const postSlice = createSlice({
  name: 'comments',
  initialState: {
    collection: {
      data: [],
      status: 'loading'
    },
    comment: {
      entity: {},
      status: 'loading'
    },
    reply: {
      entity: {},
      status: 'loading'
    },
    error: null
  },
  reducers: {

  },
  extraReducers: {
    [fetchComments.pending]: (state, action) => {
      state.collection.status = 'loading';
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.collection.status = 'succeeded';
      state.collection.data = action.payload;
    },
    [fetchComments.rejected]: (state, action) => {
      state.collection.status = 'failed';
      state.error = action.error.message;
    },
    [addComment.pending]: (state, action) => {
      state.collection.status = 'loading';
    },
    [addComment.fulfilled]: (state, action) => {
      state.collection.data.unshift(action.payload);
      state.collection.status = 'succeeded';
    },
    [addComment.rejected]: (state, action) => {
      state.collection.status = 'failed';
      state.error = action.error.message;
    },
    [addReply.pending]: (state, action) => {
      state.reply.status = 'loading';
    },
    [addReply.fulfilled]: (state, action) => {
      state.collection.data = addReplyForComment(state.collection.data, action.payload.parent, action.payload);
      state.reply.entity = action.payload;
      state.reply.status = 'succeeded';
    },
    [addReply.rejected]: (state, action) => {
      state.reply.status = 'failed';
      state.error = action.error.message;
    }
  }
});

export default postSlice.reducer;