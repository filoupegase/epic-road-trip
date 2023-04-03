import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

export const initialState = {
    loading: false,
    userToken,
    error: null,
    success: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {}
});
