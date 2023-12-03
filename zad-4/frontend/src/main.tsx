import "./globals.css";
import "@fontsource-variable/inter";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "@/store/store";
import { HomePage } from "@/routes/page";
import { Error } from "@/routes/error";
import { RootLayout } from "@/routes/layout";
import { CartPage } from "@/routes/cart/page";
import { AdminPage } from "@/routes/admin/page";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "cart",
				element: <CartPage />,
			},
			{
				path: "/admin",
				element: <AdminPage />,
			},
		],
	},
]);

// eslint-disable-next-line import/no-named-as-default-member
ReactDOM.createRoot(document.querySelector("#root")!).render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<RouterProvider router={router} />
		</ReduxProvider>
	</React.StrictMode>,
);
