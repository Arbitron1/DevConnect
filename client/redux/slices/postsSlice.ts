import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetch', async ({ page = 1 }: any) => {
  const res = await axios.get(`/api/posts?page=${page}`);
  return { posts: res.data.posts, page: res.data.page };
});

export const likePost = createAsyncThunk('posts/like', async ({ postId }: any, { getState }) => {
  const token = (getState() as any).auth.token;
  const res = await axios.post(`/api/posts/${postId}/like`, {}, { headers: { Authorization: `Bearer ${token}` } });
  return { postId, likesCount: res.data.likesCount, liked: res.data.liked };
});

const slice = createSlice({
  name: 'posts',
  initialState: { posts: [] as any[], loading: false, page: 1 } as any,
  reducers: {
    addCommentToPost(state, action) {
      const { postId, comment, commentsCount } = action.payload;
      const p = state.posts.find((x:any) => x._id === postId);
      if (p) {
        p.commentsCount = commentsCount;
        if (!p.comments) p.comments = [];
        p.comments.unshift(comment);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (s) => { s.loading = true; });
    builder.addCase(fetchPosts.fulfilled, (s, a) => {
      s.loading = false;
      s.page = a.payload.page;
      const existingIds = new Set(s.posts.map((p:any) => p._id));
      const newPosts = a.payload.posts.filter((p:any) => !existingIds.has(p._id));
      s.posts = [...s.posts, ...newPosts];
    });
    builder.addCase(fetchPosts.rejected, (s) => { s.loading = false; });

    builder.addCase(likePost.fulfilled, (s, a) => {
      const { postId, likesCount } = a.payload as any;
      const p = s.posts.find((x:any) => x._id === postId);
      if (p) p.likes = new Array(likesCount).fill(true); 
    });
  }
});

export const { addCommentToPost } = slice.actions;
export default slice.reducer;
