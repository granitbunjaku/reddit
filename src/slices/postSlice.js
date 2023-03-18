import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { updateVotes } from "./postsSlice";

export const getPost = createAsyncThunk(
    'post/fetchPost',
    async (id, thunkAPI) => {
      try {
        const state = thunkAPI.getState().user;

        const response = await axios.get(`http://localhost:8000/api/${state.isLoggedin ? `posts/${id}` : `post/${id}`}`, {
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


  export const vote = createAsyncThunk(
      'post/vote',
      async ({name, type, id}, thunkAPI) => {
        try {
          const state = thunkAPI.getState().user;

          const response = await axios.post(`http://localhost:8000/api/vote/${name}/${type}/${id}`, {}, {
            headers: {
              "Authorization": `Bearer ${state.user.token}`
            }
          })
          thunkAPI.dispatch(updateVotes({id: id, votes : response.data, type: type}))
          return response.data
        } catch (error) {
          return thunkAPI.rejectWithValue('something went wrong');
        }
      }
    );

const initialState = {
    post: [],
    postLoading: true
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(getPost.pending, (state) => {
          state.postLoading = true
        })
        .addCase(getPost.fulfilled, (state, action) => {
          state.post = action.payload
          state.postLoading = false
        })
        .addCase(getPost.rejected, (state) => {
          state.postLoading = false
        })
        .addCase(vote.fulfilled, (state, action) => {
          state.post.votes = action.payload
        })
    }
})

export default postSlice.reducer