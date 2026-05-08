"use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: "sage" | "amber" | "coral" | "sky" | "violet" | "gray";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "gray", size = "sm", className }: BadgeProps) {
  const variantClasses = {
    sage: "bg-sage-100 text-sage-700 border-sage-200",
    amber: "bg-amber-100 text-amber-700 border-amber-200",
    coral: "bg-coral-100 text-coral-700 border-coral-200",
    sky: "bg-sky-100 text-sky-700 border-sky-200",
    violet: "bg-violet-100 text-violet-700 border-violet-200",
    gray: "bg-gray-100 text-gray-600 border-gray-200",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className, padding = true }: CardProps) {
  return (
    <div className={cn("bg-white rounded-xl border border-gray-200 shadow-sm", padding && "p-5", className)}>
      {children}
    </div>
  );
}

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  className?: string;
}

export function ProgressBar({ value, max = 100, color = "bg-sage-500", className }: ProgressBarProps) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className={cn("w-full bg-gray-100 rounded-full h-1.5", className)}>
      <div
        className={cn("h-1.5 rounded-full transition-all duration-500", color)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

interface SectionHeaderProps {
  icon?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ icon, title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div className="flex items-center gap-3">
        {icon && <span className="text-xl">{icon}</span>}
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
          {subtitle && <p className="text-sm text-ink-muted mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-gray-100 my-4", className)} />;
}

export function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8" };
  return (
    <div
      className={cn(
        "border-2 border-sage-200 border-t-sage-500 rounded-full animate-spin",
        sizeClasses[size]
      )}
    />
  );
}

interface AlertProps {
  type?: "info" | "warning" | "error" | "success";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Alert({ type = "info", title, children, className }: AlertProps) {
  const typeClasses = {
    info: "bg-sky-50 border-sky-200 text-sky-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    error: "bg-coral-50 border-coral-200 text-coral-800",
    success: "bg-sage-50 border-sage-200 text-sage-800",
  };
  const icons = { info: "ℹ️", warning: "⚠️", error: "❌", success: "✅" };

  return (
    <div className={cn("flex gap-3 p-4 rounded-lg border text-sm", typeClasses[type], className)}>
      <span className="flex-shrink-0 mt-0.5">{icons[type]}</span>
      <div>
        {title && <p className="font-semibold mb-1">{title}</p>}
        <div className="leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({
  variant = "secondary",
  size = "md",
  loading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-sage-600 text-white hover:bg-sage-700 border border-sage-700 shadow-sm",
    secondary: "bg-white text-ink hover:bg-gray-50 border border-gray-200 shadow-sm",
    ghost: "bg-transparent text-ink-muted hover:bg-gray-100 border border-transparent",
    danger: "bg-coral-600 text-white hover:bg-coral-700 border border-coral-700 shadow-sm",
  };
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 font-medium rounded-lg transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : icon}
      {children}
    </button>
  );
}

export function TabBar({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: { id: string; label: string; icon?: string; count?: number }[];
  activeTab: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all",
            activeTab === tab.id
              ? "bg-white text-ink shadow-sm"
              : "text-ink-muted hover:text-ink"
          )}
        >
          {tab.icon && <span>{tab.icon}</span>}
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={cn(
                "inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold",
                activeTab === tab.id ? "bg-sage-100 text-sage-700" : "bg-gray-200 text-gray-600"
              )}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
