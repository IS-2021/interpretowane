import "./globals.css";
import "@fontsource-variable/inter";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { App } from "@/App";
import { store } from "@/store/store";

// eslint-disable-next-line import/no-named-as-default-member
ReactDOM.createRoot(document.querySelector("#root")!).render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<App />
		</ReduxProvider>
	</React.StrictMode>,
);
