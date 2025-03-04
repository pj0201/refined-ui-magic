
"use client"

import * as React from "react"
import { toast as sonnerToast, type ToastT } from "sonner"

// 修正: SonnerのActionインターフェースを適切に追従
interface Action {
  label: string
  onClick: () => void
}

// 修正: SonnerのAPIに従った型定義
export interface ToastProps {
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: "default" | "destructive"
  duration?: number
  action?: Action
  // 修正: cancelをSonnerの期待する形式に合わせる
  cancel?: Action | React.ReactNode
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
  
  // Sonnerの期待する型との互換性を確保
  return sonnerToast(title as string, {
    description,
    className: variant === "destructive" ? "destructive" : undefined,
    ...options,
  })
}

// 修正: 型エラーを解消するために、Sonnerの期待する型と互換性のある型を使用
toast.success = (title: string, props?: Omit<ToastT, "title" | "id" | "type" | "jsx" | "delete" | "promise">) => {
  return sonnerToast.success(title, props)
}

toast.error = (title: string, props?: Omit<ToastT, "title" | "id" | "type" | "jsx" | "delete" | "promise">) => {
  return sonnerToast.error(title, props)
}

toast.warning = (title: string, props?: Omit<ToastT, "title" | "id" | "type" | "jsx" | "delete" | "promise">) => {
  return sonnerToast.warning(title, props)
}

toast.info = (title: string, props?: Omit<ToastT, "title" | "id" | "type" | "jsx" | "delete" | "promise">) => {
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
