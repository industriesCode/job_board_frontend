import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jobList } from "../actions";

// Define an asynchronous thunk to fetch job posts
export const fetchJobPosts = createAsyncThunk('jobPosts/fetchJobPosts', async () => {
    const response = jobList();
    return response.data;
});

// Define the jobPosts slice
const jobPostsSlice = createSlice({
    name: 'jobPosts',
    initialState: {
        posts: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle the pending state while fetching job posts
            .addCase(fetchJobPosts.pending, (state) => {
                state.status = 'loading';
            })
            // Handle the success state after fetching job posts
            .addCase(fetchJobPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            // Handle the failure state if fetching job posts fails
            .addCase(fetchJobPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// Export the action creators and reducers
export const {} = jobPostsSlice.actions;
export default jobPostsSlice.reducer;
