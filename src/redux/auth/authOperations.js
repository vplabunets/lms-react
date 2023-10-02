import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://65150d46dc3282a6a3cdc80c.mockapi.io/users';

const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};


const register = createAsyncThunk(
    'auth/register',
    async (credentials, thunkAPI) => {
        try {
            const res = await axios.post('/', credentials);
            setAuthHeader(res.data.token);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const logIn = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const res = await axios.get('/', credentials);
            // console.log(credentials)
            // console.log("credentials.email", credentials.email)
            const loggingUser = await res.data.find(element => element.user.email === credentials.email)
            if (loggingUser && loggingUser.user.password === credentials.password) {
                return {...loggingUser, isLoggedIn: true}
            }
            // setAuthHeader(res.data.token);
            return {...loggingUser, isLoggedIn: false, user: {email: credentials.email, password: credentials.password}}
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await axios.get('/');
        // After a successful logout, remove the token from the HTTP header
        clearAuthHeader();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
//
// /*
//  * GET @ /users/current
//  * headers: Authorization: Bearer token
//  */
// export const refreshUser = createAsyncThunk(
//     'auth/refresh',
//     async (_, thunkAPI) => {
//         // Reading the token from the state via getState()
//         const state = thunkAPI.getState();
//         const persistedToken = state.auth.token;
//
//         if (persistedToken === null) {
//             // If there is no token, exit without performing any request
//             return thunkAPI.rejectWithValue('Unable to fetch user');
//         }
//
//         try {
//             // If there is a token, add it to the HTTP header and perform the request
//             setAuthHeader(persistedToken);
//             const res = await axios.get('/users/me');
//             return res.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );
const authOperations = {
    register,
    logIn,
    logOut

};
export default authOperations;