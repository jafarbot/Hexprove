# Frontend Component Patterns for HexProve

## Theme-Aware Components

### CSS Variables Setup

Ensure the project has theme variables defined:

```css
/* globals.css or tailwind config */
:root {
  /* Light mode (default) */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-surface: #ffffff;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --border-color: #e2e8f0;
  --accent-primary: #6366f1;
  --accent-hover: #4f46e5;
}

[data-theme="dark"], .dark {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-surface: #1e293b;
  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
  --text-muted: #64748b;
  --border-color: #334155;
  --accent-primary: #818cf8;
  --accent-hover: #6366f1;
}
```

### Theme Toggle Component

```tsx
'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check system preference or stored preference
    const stored = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (systemDark ? 'dark' : 'light');
    setTheme(initial as 'light' | 'dark');
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
```

## Responsive Patterns

### Container Component

```tsx
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Container({ children, className, size = 'lg' }: ContainerProps) {
  const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizes[size], className)}>
      {children}
    </div>
  );
}
```

### Responsive Grid

```tsx
interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

export function Grid({ children, cols = 3, gap = 'md' }: GridProps) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };
  
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  return (
    <div className={cn('grid', colClasses[cols], gapClasses[gap])}>
      {children}
    </div>
  );
}
```

## Common UI Components

### Button Component

```tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700',
        outline: 'border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800',
        ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
```

### Card Component

```tsx
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-white dark:bg-gray-900',
        'border-gray-200 dark:border-gray-800',
        'p-6',
        hover && 'transition-shadow hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
}
```

### Section Component

```tsx
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'default' | 'alt' | 'dark';
}

export function Section({ children, className, id, background = 'default' }: SectionProps) {
  const backgrounds = {
    default: 'bg-white dark:bg-gray-950',
    alt: 'bg-gray-50 dark:bg-gray-900',
    dark: 'bg-gray-900 dark:bg-gray-950 text-white',
  };

  return (
    <section
      id={id}
      className={cn('py-16 md:py-24', backgrounds[background], className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
```

## Form Components

### Input Component

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || props.name;
  
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-lg border px-4 py-3',
          'bg-white dark:bg-gray-900',
          'border-gray-300 dark:border-gray-700',
          'text-gray-900 dark:text-white',
          'placeholder:text-gray-500 dark:placeholder:text-gray-400',
          'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
          'transition-colors',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
```

### Textarea Component

```tsx
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const textareaId = id || props.name;
  
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          'w-full rounded-lg border px-4 py-3 min-h-[120px]',
          'bg-white dark:bg-gray-900',
          'border-gray-300 dark:border-gray-700',
          'text-gray-900 dark:text-white',
          'placeholder:text-gray-500 dark:placeholder:text-gray-400',
          'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
          'transition-colors resize-y',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
```

## FAQ/Accordion Component

```tsx
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className={cn(
              'w-full px-6 py-4 text-left flex items-center justify-between',
              'bg-white dark:bg-gray-900',
              'hover:bg-gray-50 dark:hover:bg-gray-800',
              'transition-colors'
            )}
            aria-expanded={openIndex === index}
          >
            <span className="font-medium text-gray-900 dark:text-white">
              {item.question}
            </span>
            <ChevronDown
              className={cn(
                'w-5 h-5 text-gray-500 transition-transform',
                openIndex === index && 'rotate-180'
              )}
            />
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4 text-gray-600 dark:text-gray-400">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

## Utility: cn() Function

Always use this for conditional class names:

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Install dependencies:
```bash
npm install clsx tailwind-merge
```
