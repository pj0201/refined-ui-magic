
"use client"

import * as React from "react"
import { toast as sonnerToast, type ToastT, ExternalToast } from "sonner"

// Sonnerのタイプ定義と互換性のある独自のToastPropsインターフェースを定義
export interface ToastProps extends Omit<ExternalToast, "id" | "type" | "jsx" | "delete" | "promise"> {
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: "default" | "destructive"
  // cancel プロパティを改善して型の安全性を確保
  cancel?: {
    label: string
    onClick: () => void
  }
}

export type ToastActionElement = React.ReactElement

// 独自のToast型定義を使用
export type Toast = ToastProps

export function toast(props: ToastProps) {
  const { title, description, variant = "default", ...options } = props
  
  // titleが文字列でない場合のフォールバックとvariantに基づくスタイリングの適用
  return sonnerToast(
    typeof title === 'string' ? title : "通知", 
    {
      description,
      // destructiveバリアントのスタイルを適用 - クラス名として渡す
      className: variant === "destructive" ? "destructive" : undefined,
      ...options,
    }
  )
}

// Sonnerの型定義を使用した特定のトースト型の定義
toast.success = (title: string, props?: Omit<ExternalToast, "id" | "type" | "jsx" | "delete" | "promise">) => {
  return sonnerToast.success(title, props)
}

toast.error = (title: string, props?: Omit<ExternalToast, "id" | "type" | "jsx" | "delete" | "promise">) => {
  return sonnerToast.error(title, props)
}

toast.warning = (title: string, props?: Omit<ExternalToast, "id" | "type" | "jsx" | "delete" | "promise">) => {
  return sonnerToast.warning(title, props)
}

toast.info = (title: string, props?: Omit<ExternalToast, "id" | "type" | "jsx" | "delete" | "promise">) => {
  return sonnerToast.info(title, props)
}

// 追加: プログラム的に型安全なトーストを呼び出すための便利なメソッド
toast.dismiss = sonnerToast.dismiss
toast.promise = sonnerToast.promise

// クリーンなuseToastフック実装
export function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  }
}
