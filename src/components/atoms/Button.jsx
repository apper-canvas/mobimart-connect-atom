import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:ring-primary",
    secondary: "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white active:scale-[0.98] focus:ring-secondary",
    ghost: "text-primary hover:bg-primary/10 active:scale-[0.98] focus:ring-primary",
    danger: "bg-error text-white hover:bg-error/90 active:scale-[0.98] focus:ring-error",
    accent: "bg-gradient-to-r from-accent to-secondary text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus:ring-accent"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-base rounded-lg",
    lg: "px-6 py-3 text-lg rounded-lg"
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;