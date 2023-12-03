import { HomeIcon, ShoppingCart } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Heading } from "@/components/Heading";

type HeaderProps = {
	totalCartItems: number;
};

export function Header({ totalCartItems }: HeaderProps) {
	const location = useLocation();

	const isOnAdminPage = location.pathname === "/admin";
	const heading = isOnAdminPage ? "Panel sklepu" : "Sklep internetowy";
	const logoHref = isOnAdminPage ? "/admin" : "/";

	return (
		<header className="flex items-center justify-between bg-neutral-900 px-10 py-4 text-white">
			<Link to={logoHref}>
				<Heading>{heading}</Heading>
			</Link>
			<nav className="flex items-center gap-3">
				<Link to="/">
					<HomeIcon />
				</Link>
				<Link to="/cart">
					<button className="relative block">
						<span className="absolute right-[-6px] top-[-6px] flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-black">
							{totalCartItems}
						</span>
						<ShoppingCart />
					</button>
				</Link>
			</nav>
		</header>
	);
}
