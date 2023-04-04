import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginForm } from "@/interface";
import { axiosClient } from "@/_core/services/axios";


const userToken: string | null = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null

export const initialState = {
    loading: false,
    userToken,
    error: null,
    success: false,
}

export const login = createAsyncThunk('auth/login',
    async ({ email, password }: LoginForm,
           { rejectWithValue }): Promise<any> => {
        try {
            const { data } = await axiosClient.post('/api/user/login/',
                { email, password }
            )
            localStorage.setItem('userToken', data.token);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response)
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.success = true;
            console.log("**", payload);
            //state.userToken = payload.token;
        });
        builder.addCase(login.rejected, (state, { payload }) => {
            state.loading = false
            // @ts-ignore
            state.error = payload
        });
    }
});
