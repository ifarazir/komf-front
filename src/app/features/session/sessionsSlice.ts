import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { register, login, getMe } from "../../logic/auth";

export const registerUser = createAsyncThunk("session/register", async (data: any) => {
    const resp = await register(data);
    return resp;
});

export const loginUser = createAsyncThunk("session/login", async (data: { email: string; password: string }) => {
    const resp = await login(data);
    return resp;
});

export const fetchUser = createAsyncThunk("session/fetchUser", async () => {
    const resp = await getMe();
    return resp;
});

interface IInitial {
    session: any;
    status: "authorized" | "unauthorized" | "authorizing" | "error";
    error?: string;
}

const initialState: IInitial = { session: null, status: "unauthorized" };

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setUser(state, action) {
            state.session = action.payload;
            state.status = "authorized";
        },
        logout(state) {
            state.session = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.status = "authorizing";
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.status = "authorized";
            state.session = action.payload.data;
        });
        builder.addCase(fetchUser.rejected, (state, action: any) => {
            state.status = "unauthorized";
            state.error = action.payload?.message;
        });

        builder.addCase(registerUser.pending, (state, action) => {
            state.status = "authorizing";
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.status = "authorized";
            state.session = action.payload.data;
        });
        builder.addCase(registerUser.rejected, (state, action: any) => {
            state.status = "unauthorized";
            state.error = action.payload.message;
        });

        builder.addCase(loginUser.pending, (state, action) => {
            state.status = "authorizing";
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if(action.payload.status === 'failed'){
                state.status = "unauthorized";
                state.error = action.payload.message;
            } else {
                state.status = "authorized";
                state.session = action.payload.data;
            }
        });
        builder.addCase(loginUser.rejected, (state, action: any) => {
            state.status = "unauthorized";
            state.error = action.payload.message;
        });
    },
});

export default sessionSlice.reducer;

export const selectSession = (state: any) => state.session.session;

export const { setUser, logout } = sessionSlice.actions;
