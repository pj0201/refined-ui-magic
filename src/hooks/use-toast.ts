
"use client"

import * as React from "react"
import { toast as sonnerToast } from "sonner"

// シンプルな型定義
export type ToastProps = {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactElement
  variant?: "default" | "destructive"
}

export type ToastActionElement = React.ReactElement

// Custom toast type
export type Toast = ToastProps

// カスタム toast 関数
export function toast({ 
  title, 
  description, 
  action,
  variant = "default", 
  ...props 
}: Toast) {
  return sonnerToast(title as string, {
    description,
    action,
    // Sonner の型に合わせて変換
    className: variant === "destructive" ? "destructive" : undefined,
    ...props,
  })
}

// useToast フック - シンプル化
export function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss
  }
}
