
"use client"

import * as React from "react"
import { toast as sonnerToast, type ToastT, ExternalToast } from "sonner"

// We'll correctly extend from Sonner's types to ensure compatibility
export interface ToastProps extends Omit<ExternalToast, "id" | "type" | "jsx" | "delete" | "promise"> {
  title?: React.ReactNode
  variant?: "default" | "destructive"
}

export type ToastActionElement = React.ReactElement

// Directly use Sonner's Toast type
export type Toast = ToastProps

export function toast(props: ToastProps) {
  const { title, description, variant = "default", ...options } = props
  
  // Cast to string only if it's not already a string
  return sonnerToast(title as string, {
    description,
    className: variant === "destructive" ? "destructive" : undefined,
    ...options,
  })
}

// Use Sonner's ExternalToast type directly for perfect compatibility
toast.success = (title: string, props?: ExternalToast) => {
  return sonnerToast.success(title, props)
}

toast.error = (title: string, props?: ExternalToast) => {
  return sonnerToast.error(title, props)
}

toast.warning = (title: string, props?: ExternalToast) => {
  return sonnerToast.warning(title, props)
}

toast.info = (title: string, props?: ExternalToast) => {
  return sonnerToast.info(title, props)
}

// Simplified useToast hook
export function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  }
}
