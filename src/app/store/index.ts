import { configureStore } from "@reduxjs/toolkit";

import sessionsSlice from "../features/session/sessionsSlice";

export const store = configureStore({
    reducer: {
        session: sessionsSlice,
    },
});
