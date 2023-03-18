import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getUser } from "./userSlice";

export const getPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, thunkAPI) => {
      try {
        await thunkAPI.dispatch(getUser())
        const state = thunkAPI.getState().user;
        const response = await axios.get(`http://localhost:8000/api/${state.isLoggedin ? `posts` : `all/posts`}`, {
          headers: {
            "Authorization": `Bearer ${state.user.token}`
          }
        })
        return response.data
      } catch (error) {
        return thunkAPI.rejectWithValue('something went wrong');
      }
    }
  );

const initialState = {
    posts: [],
    postsLoading: true
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
      updateVotes: (state, {payload}) => {
        const updatedPosts = state.posts.map(post => {
          if(post.data.id == payload.id) {
            post.votes = payload.votes
          }
          return post
        })
        state.posts = updatedPosts
      } 
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPosts.pending, (state) => {
          state.postsLoading = true
        })
        .addCase(getPosts.fulfilled, (state, action) => {
          state.posts = action.payload
          state.postsLoading = false
        })
        .addCase(getPosts.rejected, (state) => {
          state.postsLoading = false
        })
    }
})

export const {updateVotes} = postsSlice.actions

export default postsSlice.reducer