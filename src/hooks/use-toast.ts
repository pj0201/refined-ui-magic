
"use client"

import * as React from "react"
import { toast as sonnerToast, type Toast as SonnerToast, type ToastOptions } from "sonner"

// Sonnerの型定義を拡張した独自のToast型
export interface ToastProps extends ToastOptions {
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: "default" | "destructive"
}

export type ToastActionElement = React.ReactElement

// Sonnerの型定義を活用したToast型
export type Toast = ToastProps

// カスタム toast 関数 - Sonnerの型定義に準拠
export function toast({ 
  title, 
  description, 
  variant = "default", 
  ...props 
}: ToastProps) {
  return sonnerToast(title as string, {
    description,
    // Sonnerのスタイル指定に合わせた実装
    className: variant === "destructive" ? "destructive" : undefined,
    ...props,
  })
}

// シンプル化したuseToastフック
export function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  }
}
