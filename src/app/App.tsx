import { useDispatch } from "react-redux";
import { ThemeProvider } from "./theme";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./theme/index.css";

import Router from "./Router";

import "./logic";
import { useEffect } from "react";
import { fetchUser } from "./features/session/sessionsSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    return (
        <ThemeProvider>
            <Router />
        </ThemeProvider>
    );
}

export default App;
