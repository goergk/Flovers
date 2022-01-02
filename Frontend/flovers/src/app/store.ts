import { configureStore } from '@reduxjs/toolkit';
import loginReducer  from '../features/login';
import { FloristsApi } from '../services/FloristsApi';

export const store =  configureStore({
    reducer: {
        Login: loginReducer,
        [FloristsApi.reducerPath]: FloristsApi.reducer,        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(FloristsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch