import { useDispatch } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "./theme";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./theme/index.css";

import Router from "./Router";

import "./logic";
import { useEffect } from "react";
import { fetchUser } from "./features/session/sessionsSlice";

const queryClient = new QueryClient();

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <Router />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
