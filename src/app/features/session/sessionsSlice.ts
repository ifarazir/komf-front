import { createSlice } from "@reduxjs/toolkit";

interface IInitial {
    session: any;
    status: "authorized" | "unauthorized" | "error";
    error?: string;
}

const initialState: IInitial = { session: {}, status: "unauthorized" };

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setUser(state, action) {
            state.session = action.payload
            state.status = 'authorized'
        }
    },
});

export default sessionSlice.reducer;

export const selectSession = (state:any) => state.session.session;

export const {setUser} = sessionSlice.actions;