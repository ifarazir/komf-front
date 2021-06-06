import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SWRConfig } from "swr";
import { ThemeProvider } from "./theme";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./theme/index.css";

import Router from "./Router";

import "./logic";
import { fetchUser } from "./features/session/sessionsSlice";
import { fetcher } from "./logic";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    return (
        <SWRConfig value={{ fetcher: fetcher }}>
            <ThemeProvider>
                <Router />
            </ThemeProvider>
        </SWRConfig>
    );
}

export default App;
