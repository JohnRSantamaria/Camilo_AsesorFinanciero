import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
	"inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent text-sm font-medium whitespace-nowrap outline-none select-none transition-[transform,box-shadow,filter] duration-200 ease-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
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
				cta: "bg-gradient-to-b from-[var(--cta-from)] via-[var(--cta-mid)] to-[var(--cta-to)] text-white font-semibold tracking-wide normal-case shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] dark:shadow-primary/15",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-11 rounded-lg px-6",
				cta: "h-auto min-h-12 px-6 py-3 text-base md:text-lg rounded-xl",
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
				className={cn(buttonVariants({ variant, size }), className)}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = "Button"

export { Button, buttonVariants }
