import {createSlice} from '@reduxjs/toolkit';
import authOperations from './authOperations';

const initialState = {
    user: {name: "Volodymyr Labunets", email: "myemail@mail.com", password: "yyy", type: "student",},
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [authOperations.register.pending](state) {
            state.isRefreshing = true;
        },
        [authOperations.register.fulfilled](state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.isRefreshing = false;
        },
        [authOperations.logIn.fulfilled](state, action) {
            state.user = action.payload.user;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        [authOperations.logOut.fulfilled](state) {
            state.user = {name: null, email: null};
            state.token = null;
            state.isLoggedIn = false;
        },

    },
});

export const authReducer = authSlice.reducer;
