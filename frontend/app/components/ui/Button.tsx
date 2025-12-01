import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  ...props
}) => {
  const baseStyles =
    'font-bold border-[3px] border-black px-6 py-2 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none';

  const variants = {
    primary:
      'bg-primary text-black shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]',
    secondary:
      'bg-secondary text-white shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]',
    outline: 'bg-white text-black shadow-neo hover:bg-gray-50',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  );
};

export default Button;
