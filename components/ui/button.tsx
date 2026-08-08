import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
	"inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
	{
		variants: {
			variant: {
				default: "bg-primary text-white hover:shadow",
				outline:
					"border border-input bg-background hover:bg-muted hover:text-foreground",
				secondary: "bg-secondary text-dark hover:opacity-90",
				ghost: "hover:bg-muted hover:text-foreground",
				destructive: "bg-red-500 text-white hover:bg-red-600",
				link: "text-primary underline-offset-4 hover:underline",
				cta: "bg-gradient-to-t from-primary via-primaryLight to-primaryDark text-white uppercase font-semibold tracking-widest hover:shadow-md hover:scale-105 active:scale-95 transition-transform duration-300",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-11 rounded-lg px-6",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button"
		return (
			<Comp
				data-slot="button"
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = "Button"

export { Button, buttonVariants }
