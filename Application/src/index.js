import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer from "./redux/reducer";
import AuthContextProvider from "./context/authContext";

const store = createStore(reducer);

ReactDOM.render(
	<AuthContextProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</AuthContextProvider>,
	document.getElementById("root")
);

serviceWorker.unregister();
