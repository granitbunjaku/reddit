import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSubreddit = createAsyncThunk('subreddit', async (subreddit, thunkAPI) => {
    try{
        const state = thunkAPI.getState().user
        const response = await axios.get(`http://localhost:8000/api/${state.isLoggedin ? `subreddits/${subreddit}` : `show/subreddit/${subreddit}`}`, {
          headers: {
            "Authorization": `Bearer ${state.user.token}`
          }
        })
        return response.data
    }
    catch(error) {
        return thunkAPI.rejectWithValue('something went wrong');
    }
})

export const joinSubreddit = createAsyncThunk('join/subreddit', async (subreddit, thunkAPI) => {
    try{
        const userState = thunkAPI.getState().user.user

        const response = await axios.post(`http://localhost:8000/api/subreddit/join/${subreddit}`, {}, {
            headers: {
                'Authorization': `Bearer ${userState.token}`
            }
        })

        return response.data
    }
    catch(error) {
        return thunkAPI.rejectWithValue('something went wrong');
    }
})

const initialState = {
    subreddit: [],
    isLoading: true
}

const subredditSlice = createSlice({
    name: "subreddit",
    initialState,
    reducers: {
        updatePic: (state, action) => {
            const { fileDest, file } = action.payload;
            if (fileDest === 'profile_image') {
              state.subreddit.data.profile_image = file;
            } else if (fileDest === 'cover_image') {
              state.subreddit.data.cover_image = file;
            }
        },
        updateAbout: (state, action) => {
            state.subreddit.data.about = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getSubreddit.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getSubreddit.fulfilled, (state, action) => {
          state.subreddit = action.payload
          state.isLoading = false
        })
        .addCase(getSubreddit.rejected, (state) => {
          state.isLoading = false
        })
        .addCase(joinSubreddit.fulfilled, (state, action) => {
            if(state.subreddit.isJoined) {
                state.subreddit.isJoined = false
                state.subreddit.data.members--
            } else {
                state.subreddit.isJoined = true
                state.subreddit.data.members++
            }
        })
    }
})

export const {updatePic, updateAbout} =  subredditSlice.actions;
export default subredditSlice.reducer;