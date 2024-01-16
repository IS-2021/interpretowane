import { cn } from "@/lib/utils";

type HeadingProps = {
	children: React.ReactNode;
	className?: string;
};

export function Heading({ children, className }: HeadingProps) {
	return <h1 className={cn("text-2xl font-bold tracking-tight", className)}>{children}</h1>;
}
