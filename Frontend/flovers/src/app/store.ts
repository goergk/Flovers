import { configureStore } from '@reduxjs/toolkit';
import loginReducer  from '../features/login';

export const store =  configureStore({
    reducer: {
        Login: loginReducer,        
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch