
import { Toaster as SonnerToaster } from "sonner"
import { useTheme } from "next-themes"

export function Toaster() {
  const { theme = "system" } = useTheme()

  return (
    <SonnerToaster
      theme={theme as "system" | "light" | "dark"}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group destructive:group-[.toaster]:border-destructive group destructive:group-[.toaster]:bg-destructive group destructive:group-[.toaster]:text-destructive-foreground",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
    />
  )
}
