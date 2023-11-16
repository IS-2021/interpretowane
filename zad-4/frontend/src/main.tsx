import "./globals.css";
import "@fontsource-variable/inter";
import ReactDOM from "react-dom/client";
import React from "react";
import { App } from "@/App";

// eslint-disable-next-line import/no-named-as-default-member
ReactDOM.createRoot(document.querySelector("#root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
