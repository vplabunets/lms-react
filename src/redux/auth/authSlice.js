import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, { payload: { accessToken, user } }) => {
            console.log('in set credentials', accessToken);
            state.token = accessToken;
            state.user = user;
            state.isLoggedin = true;
        },
        logOut: state => {
            state.token = '';
            state.user = '';
            state.isLoggedin = false;
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectCurrentUser = state => state;
