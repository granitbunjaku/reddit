import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import subredditsReducer from "./slices/subredditsSlice";
import subredditReducer from "./slices/subredditSlice";
import postsReducer from "./slices/postsSlice";
import postReducer from "./slices/postSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        subreddits: subredditsReducer,
        subreddit: subredditReducer,
        posts: postsReducer,
        post: postReducer
    }
})