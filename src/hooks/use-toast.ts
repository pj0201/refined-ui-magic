"use client"

import * as React from "react"
import { toast as sonnerToast, type ToastT, ExternalToast } from "sonner"

// Define our customized ToastProps interface that extends Sonner's ExternalToast
export interface ToastProps extends Omit<ExternalToast, "id" | "type" | "jsx" | "delete" | "promise"> {
  title?: React.ReactNode
  variant?: "default" | "destructive"
  // We keep the variant property which isn't in Sonner's ExternalToast
}

export type ToastActionElement = React.ReactElement

// Use our custom Toast type definition
export type Toast = ToastProps

export function toast(props: ToastProps) {
  const { title, description, variant = "default", ...options } = props
  
  // We handle the variant property here and convert it to className for Sonner
  return sonnerToast(typeof title === 'string' ? title : "通知", {
    description,
    className: variant === "destructive" ? "destructive" : undefined,
    ...options,
  })
}

// Define specific toast types using Sonner's ExternalToast type
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

// Clean useToast hook implementation
export function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  }
}
