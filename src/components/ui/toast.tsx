"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type ToastVariant = "default" | "success" | "error" | "warning";

type ToastItem = {
  id: string;
  title?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number; // milliseconds
  actionLabel?: string;
  onAction?: () => void;
};

type ToastContextValue = {
  toasts: ToastItem[];
  show: (t: Omit<ToastItem, "id">) => void;
  dismiss: (id: string) => void;
  clear: () => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((t: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2);
    const toast: ToastItem = {
      id,
      variant: t.variant ?? "default",
      duration: t.duration ?? 3500,
      ...t,
    };
    setToasts((prev) => [...prev, toast]);
    if (toast.duration && toast.duration > 0) {
      window.setTimeout(() => dismiss(id), toast.duration);
    }
  }, [dismiss]);

  const clear = useCallback(() => setToasts([]), []);

  const value = useMemo(() => ({ toasts, show, dismiss, clear }), [toasts, show, dismiss, clear]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast deve ser usado dentro de <ToastProvider>");
  return ctx;
};

const variantClasses: Record<ToastVariant, string> = {
  default: "bg-neutral-800 text-white",
  success: "bg-emerald-600 text-white",
  error: "bg-red-600 text-white",
  warning: "bg-amber-500 text-white",
};

const ToastViewport = ({
  toasts,
  dismiss,
}: {
  toasts: ToastItem[];
  dismiss: (id: string) => void;
}) => (
  <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
    {toasts.map((t) => (
      <div
        key={t.id}
        className={cn(
          "shadow-md rounded-md px-4 py-3 flex items-start gap-3 max-w-xs animate-in fade-in slide-in-from-bottom-2",
          variantClasses[t.variant ?? "default"]
        )}
      >
        <div className="flex-1">
          {t.title && <div className="font-semibold">{t.title}</div>}
          <div className="text-sm">{t.message}</div>
          {t.actionLabel && (
            <button
              onClick={() => {
                t.onAction?.();
                dismiss(t.id);
              }}
              className="mt-2 underline decoration-white/80"
            >
              {t.actionLabel}
            </button>
          )}
        </div>
        <button
          onClick={() => dismiss(t.id)}
          className="ml-2 opacity-80 hover:opacity-100"
          aria-label="Fechar"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
);

export type { ToastItem, ToastVariant };