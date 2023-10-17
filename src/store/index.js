import { configureStore } from '@reduxjs/toolkit';
import { lmsBackApi } from './lmsBackApi/lmsBack';
import { authReducer } from '../redux/auth/authSlice';
import storage from 'redux-persist/lib/storage';

import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';

// Persisting token field from auth slice to localstorage
const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'user'],
};
export const store = configureStore({
    reducer: {
        [lmsBackApi.reducerPath]: lmsBackApi.reducer,
        auth: persistReducer(authPersistConfig, authReducer),
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(lmsBackApi.middleware),
    // devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
