
// sonnerを直接使用するように変更
export { toast } from "sonner";

// 後方互換性のために空のuseToastフックを提供
export const useToast = () => {
  return {
    toast: (options: any) => {
      if (options.variant === 'destructive') {
        toast.error(options.description || options.title);
      } else {
        toast.success(options.description || options.title);
      }
    }
  };
};

export type ToastActionElement = any;
export type ToastProps = any;
export type Toast = any;
