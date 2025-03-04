
"use client"

import * as React from "react"
import { toast as sonnerToast, type ToastT } from "sonner"

// Sonnerの型定義を活用した拡張型
export interface ToastProps {
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: "default" | "destructive"
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  cancel?: {
    label: string
    onClick?: () => void
  }
  onDismiss?: () => void
  onAutoClose?: () => void
  position?: ToastT["position"]
  className?: string
  id?: string | number
}

export type ToastActionElement = React.ReactElement

// Sonnerの型定義を活用したToast型
export type Toast = ToastProps

// シンプル化したtoast関数
export function toast(props: ToastProps) {
  const { title, description, variant = "default", ...options } = props
  
  return sonnerToast(title as string, {
    description,
    className: variant === "destructive" ? "destructive" : undefined,
    ...options,
  })
}

// 利便性のために追加するショートカットメソッド
toast.success = (title: string, props?: Omit<ToastProps, "title" | "variant">) => {
  return sonnerToast.success(title, props)
}

toast.error = (title: string, props?: Omit<ToastProps, "title" | "variant">) => {
  return sonnerToast.error(title, props)
}

toast.warning = (title: string, props?: Omit<ToastProps, "title" | "variant">) => {
  return sonnerToast.warning(title, props)
}

toast.info = (title: string, props?: Omit<ToastProps, "title" | "variant">) => {
  return sonnerToast.info(title, props)
}

// シンプル化したuseToastフック
export function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
    // 他のSonner機能も必要に応じて追加
  }
}
