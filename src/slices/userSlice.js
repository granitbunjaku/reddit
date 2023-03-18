import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk('loggedin/user', async (thunkAPI) => {
    try{
        const response = await axios.get('http://127.0.0.1:8000/api/user', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        return {...response.data, token: localStorage.getItem('jwt')}
    }
    catch(error) {
        return thunkAPI.rejectWithValue('something went wrong');
    }
})

const initialState = {  
    user: [],
    isLoggedin: false,
    isLoading: true
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state, action) => {
            state.user = [];
            state.isLoggedin = false;
        },
        update: (state, action) => {
            const { fileDest, file } = action.payload;
            if (fileDest === 'avatar') {
              state.user.avatar = file;
            } else if (fileDest === 'cover') {
              state.user.cover = file;
            }
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isLoggedin = true
          })
          .addCase(getUser.rejected, (state, action) => {
            state.isLoading = false;
          });
    },
})

export const {logout, update} =  userSlice.actions;
export default userSlice.reducer;