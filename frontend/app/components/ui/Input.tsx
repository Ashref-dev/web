import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ className, label, id, ...props }) => {
  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <label
          htmlFor={id}
          className='font-bold text-sm uppercase tracking-wide'
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full border-[3px] border-black p-3 font-medium outline-none focus:shadow-neo transition-shadow bg-white',
          className
        )}
        {...props}
      />
    </div>
  );
};

export default Input;
