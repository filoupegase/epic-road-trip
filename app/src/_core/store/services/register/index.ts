import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosClient } from "@/_core/services/axios";
import { SignupForm } from "@/interface";


const initialRegisterState = {
    loading: false,
    userEmail: '',
    userPassword: '',
    userPasswordCheck: '',
    error: null,
    success: false,
}

export const Signup = createAsyncThunk('auth/register',
    async ({ email, password, passwordCheck }: SignupForm,
           { rejectWithValue }): Promise<any> => {
        try {
            const { data } = await axiosClient.post('/api/user/register/',
                { email, password, passwordCheck }
            )
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response)
        }
    }
);


export const registerSlice = createSlice({
    name: 'register',
    initialState: initialRegisterState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(Signup.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(Signup.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.success = true;
            console.log("REGISTER SUCCESS", payload);
            // state.userToken = payload.token;
        });
        builder.addCase(Signup.rejected, (state, { payload }) => {
            state.loading = false
            // @ts-ignore
            state.error = payload
        });
    }
});
