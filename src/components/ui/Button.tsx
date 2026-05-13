"use client";

import React from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outlined";
}

export function Button({
  children,
  className = "",
  variant = "default",
  ...props
}: ButtonProps) {
  
  const styles =
    variant === "outlined"
      ? "border border-white/10 bg-transparent text-white hover:border-primary hover:text-primary"
      : "bg-primary text-black hover:opacity-90";

  return (
    <button
      className={`
        px-4 py-2
        transition-all duration-300
        font-bold
        uppercase
        flex items-center justify-center
        ${styles}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}