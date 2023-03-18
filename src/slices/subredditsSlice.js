import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSubreddits = createAsyncThunk('all/subreddits', async (thunkAPI) => {
    try{
        const response = await axios.get('http://127.0.0.1:8000/api/subreddits')
        return response.data
    }
    catch(error) {
        return thunkAPI.rejectWithValue('something went wrong');
    }
})

const initialState = {
    subreddits: [],
    isLoading: true
  }
  
  const subredditsSlice = createSlice({
    name: "subreddits",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
      .addCase(getSubreddits.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSubreddits.fulfilled, (state, action) => {
        state.subreddits = action.payload
        state.isLoading = false
      })
      .addCase(getSubreddits.rejected, (state) => {
        state.isLoading = false
      })
    }
  })
  
  export default subredditsSlice.reducer;