import { Router } from "@reach/router";

import Login from "./pages/Login";
import Error from "./pages/Error";
import Home from "./pages/Home";

export default function () {
    return (
        <Router>
            <Error default />
            <Home path="/" />
            <Login path="login" />
        </Router>
    );
}
