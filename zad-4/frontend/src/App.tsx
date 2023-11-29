import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { HomePage } from "@/routes/page";
import { Error } from "@/routes/error";
import { Toaster } from "@/components/UI/Toaster";
import { useAppSelector } from "@/store/store";
import { Heading } from "@/components/Heading";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		errorElement: <Error />,
	},
]);

export function App() {
	const cart = useAppSelector((state) => state.cart.cart);
	const totalCartItems = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);

	return (
		<div className="mx-auto flex h-0 min-h-screen flex-col">
			<header className="flex items-center justify-between bg-neutral-900 px-10 py-4 text-white">
				<Heading>Sklep internetowy</Heading>
				<button className="relative block">
					<span className="absolute right-[-6px] top-[-6px] flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-black">
						{totalCartItems}
					</span>
					<ShoppingCart />
				</button>
			</header>

			<div className="mx-5 my-6 flex-grow">
				<RouterProvider router={router} />
			</div>
			<Toaster />
		</div>
	);
}
