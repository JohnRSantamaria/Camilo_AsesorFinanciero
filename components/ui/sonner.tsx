"use client"

import {useEffect, useState} from "react"
import {Toaster as Sonner, type ToasterProps} from "sonner"
import {
	CircleCheckIcon,
	CircleAlertIcon,
	InfoIcon,
	TriangleAlertIcon,
	Loader2Icon,
} from "lucide-react"

type SiteTheme = "light" | "dark"

function readSiteTheme(): SiteTheme {
	if (typeof document === "undefined") return "light"
	return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

const Toaster = ({...props}: ToasterProps) => {
	const [theme, setTheme] = useState<SiteTheme>("light")

	useEffect(() => {
		const sync = () => setTheme(readSiteTheme())
		sync()

		const observer = new MutationObserver(sync)
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		})

		window.addEventListener("storage", sync)
		return () => {
			observer.disconnect()
			window.removeEventListener("storage", sync)
		}
	}, [])

	return (
		<Sonner
			theme={theme}
			closeButton
			className="toaster group"
			icons={{
				success: <CircleCheckIcon className="size-4" />,
				info: <InfoIcon className="size-4" />,
				warning: <TriangleAlertIcon className="size-4" />,
				error: <CircleAlertIcon className="size-4" />,
				loading: <Loader2Icon className="size-4 animate-spin" />,
			}}
			style={
				{
					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
					"--border-radius": "var(--radius)",
				} as React.CSSProperties
			}
			toastOptions={{
				classNames: {
					toast: "cn-toast",
					description: "!text-muted-foreground",
					closeButton:
						"!bg-popover !text-popover-foreground !border-border hover:!bg-muted",
				},
			}}
			{...props}
		/>
	)
}

export {Toaster}
