
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: null,
    token: null,
    status: ''
}

export const Register = createAsyncThunk('/register', async (info, thunkAPI) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_KEY}/api/auth/local/register`, info);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue({ error: err.message });
    }
});


export const Login = createAsyncThunk('/login', async (info, thunkAPI) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_KEY}/api/auth/local`, info);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue({ error: err.message });
    }
});




const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null,
                state.token = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(Register.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(Register.fulfilled, (state, action) => {
                state.status = 'successful';
                state.user = action.payload.user;
                state.token = action.payload.jwt;
            })
            .addCase(Register.rejected, (state) => {
                state.status = 'failed';
            })

            .addCase(Login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(Login.fulfilled, (state, action) => {
                state.status = 'successful';
                state.user = action.payload.user;
                state.token = action.payload.jwt;
            })
            .addCase(Login.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer