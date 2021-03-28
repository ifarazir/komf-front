import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "./theme";

import "bootstrap/dist/css/bootstrap.min.css";
import "./theme/index.css";

import Router from "./Router";

import "./logic";

function App() {
    return (
        <ThemeProvider>
            <Provider store={store}>
                <Router />
            </Provider>
        </ThemeProvider>
    );
}

export default App;
