import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { register, login, logout, getMe } from "../../logic/auth";

export const registerUser = createAsyncThunk("session/register", async (data: any) => {
    const resp = await register(data);
    return resp;
});

export const loginUser = createAsyncThunk("session/login", async (data: { email: string; password: string }) => {
    const resp = await login(data);
    return resp;
});

export const logoutUser = createAsyncThunk("session/logout", async () => {
    const resp = await logout();
    return resp;
});

export const fetchUser = createAsyncThunk("session/fetchUser", async () => {
    const resp = await getMe();
    return resp;
});

interface IInitial {
    session: any;
    status: "authorized" | "unauthorized" | "authorizing" | "error" | "logging_out";
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
            state.error = "failed !!";
        });

        builder.addCase(loginUser.pending, (state, action) => {
            state.status = "authorizing";
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload.status === "failed") {
                state.status = "unauthorized";
                state.error = "failed !!";
            } else {
                state.status = "authorized";
                state.session = action.payload.data;
            }
        });
        builder.addCase(loginUser.rejected, (state, action: any) => {
            state.status = "unauthorized";
            state.error = "failed !!";
        });

        builder.addCase(logoutUser.pending, (state, action) => {
            state.status = "logging_out";
        });
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.status = "unauthorized";
            state.session = null;
        });
        builder.addCase(logoutUser.rejected, (state, action: any) => {
            state.status = "error";
            state.error = "failed !!";
        });
    },
});

export default sessionSlice.reducer;

export const selectSession = (state: any) => state.session.session;

export const { setUser } = sessionSlice.actions;
