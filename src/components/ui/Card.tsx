import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className = '', onClick, hover = false }: CardProps) {
  const baseClasses = 'bg-white rounded-xl border border-zinc-200 shadow-sm p-6';
  const interactiveClasses = onClick || hover ? 'cursor-pointer hover:shadow-md hover:border-zinc-300 transition-all duration-200' : '';
  
  return (
    <div className={`${baseClasses} ${interactiveClasses} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
