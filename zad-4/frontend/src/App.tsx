import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { HomePage } from "@/routes/page";
import { Error } from "@/routes/error";
import { Toaster } from "@/components/UI/Toaster";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		errorElement: <Error />,
	},
]);

export function App() {
	return (
		<div className="mx-auto flex h-0 min-h-screen flex-col">
			<div className="mx-5 my-6 flex-grow">
				<RouterProvider router={router} />
			</div>
			<Toaster />
		</div>
	);
}
