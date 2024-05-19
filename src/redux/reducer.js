import { combineReducers } from '@reduxjs/toolkit';
import { loadingReducer } from './loadingSlice';

export const rootReducer = combineReducers({
    loading: loadingReducer,
});
