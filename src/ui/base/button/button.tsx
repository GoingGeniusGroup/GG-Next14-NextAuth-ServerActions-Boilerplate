import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, type = "button", className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        className={`cursor-pointer bg-black text-white ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
