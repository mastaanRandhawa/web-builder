import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'light' | 'dark';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Section({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'md'
}: SectionProps) {
  const variantClasses = {
    default: 'bg-white',
    light: 'bg-brand-light',
    dark: 'bg-zinc-900 text-white',
  };

  const paddingClasses = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-20 lg:py-24',
    lg: 'py-20 md:py-24 lg:py-32',
    xl: 'py-24 md:py-32 lg:py-40',
  };

  return (
    <section className={`${variantClasses[variant]} ${paddingClasses[padding]} overflow-x-hidden ${className}`}>
      {children}
    </section>
  );
}

