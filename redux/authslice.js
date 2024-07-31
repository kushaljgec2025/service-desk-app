import { createSlice } from '@reduxjs/toolkit';

// Create the auth slice
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        status: false,
        uid: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.userdetails;
            state.uid = action.payload.userid;
            state.status = true;
        },
        logout: (state) => {
            state.user = null;
            state.status = false;
        }
    }
});

// Extract the action creators object and the reducer
export const { login, logout } = authSlice.actions;
export const Authreducer = authSlice.reducer;

export default authSlice;
