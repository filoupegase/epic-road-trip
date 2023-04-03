import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginForm } from "@/interface";


// const userToken = localStorage.getItem('userToken')
//     ? localStorage.getItem('userToken')
//     : null

export const initialState = {
    loading: false,
    // userToken,
    error: null,
    success: false,
}

export const login = createAsyncThunk('auth/login',
    async ({ email, password }: LoginForm,
           { rejectWithValue }): Promise<any> => {
        try {

        } catch (error) {
            console.error(error);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {}
});
