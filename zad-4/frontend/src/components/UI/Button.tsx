import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { Ring } from "@uiball/loaders";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary text-neutral-50 shadow hover:bg-opacity-90",
				destructive: "bg-red-500 text-neutral-50 shadow-sm hover:bg-red-500/90",
				outline:
					"border border-neutral-200 bg-transparent shadow-sm hover:bg-neutral-100 hover:text-neutral-900",
				secondary: "bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-100/80",
				ghost: "hover:bg-neutral-100 hover:text-neutral-900",
				link: "text-neutral-900 underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, children, asChild = false, isLoading = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
				{!isLoading ? children : <Ring size={18} color={"white"} />}
			</Comp>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
