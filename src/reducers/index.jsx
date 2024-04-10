import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { login, logout } = userSlice.actions;

export const selectUSer = (state) => state.user.user;
export default userSlice.reducer;
