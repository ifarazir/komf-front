import { Provider } from "react-redux";
import { store } from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

import Router from "./Router";

function App() {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
}

export default App;
