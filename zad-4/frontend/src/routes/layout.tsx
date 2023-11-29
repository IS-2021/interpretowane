import React from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "@/store/store";
import { Toaster } from "@/components/UI/Toaster";
import { Header } from "@/components/Header";

export function RootLayout() {
	const cart = useAppSelector((state) => state.cart.cart);
	const totalCartItems = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);

	return (
		<div className="mx-auto flex h-0 min-h-screen flex-col">
			<Header totalCartItems={totalCartItems} />

			<div className="mx-5 my-6 flex-grow">
				<Outlet />
			</div>
			<Toaster />
		</div>
	);
}
