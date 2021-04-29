import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import sessionsSlice from "../features/session/sessionsSlice";

export const store = configureStore({
    reducer: {
        session: sessionsSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();