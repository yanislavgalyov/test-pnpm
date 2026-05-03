import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link, type To } from 'react-router-dom';
import { cn } from '../../lib/utils';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

interface ButtonAsButton
  extends
    ButtonBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  to?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  to: To;
  className?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-hover focus:ring-2 focus:ring-primary focus:ring-offset-2',
  outline:
    'border border-primary text-primary hover:bg-primary hover:text-white focus:ring-2 focus:ring-primary focus:ring-offset-2',
  ghost:
    'text-text-secondary hover:bg-gray-100 hover:text-text-primary focus:ring-2 focus:ring-gray-300 focus:ring-offset-2',
};

function Spinner() {
  return (
    <svg
      className="mr-2 h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export default function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    children,
    ...rest
  } = props;

  const baseClasses = cn(
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
    sizeClasses[size],
    variantClasses[variant],
    fullWidth && 'w-full',
  );

  if ('to' in props && props.to != null) {
    const { to, className } = props;
    return (
      <Link to={to} className={cn(baseClasses, className)}>
        {children}
      </Link>
    );
  }

  const { className, disabled, ...buttonRest } = rest as ButtonAsButton;
  return (
    <button
      className={cn(baseClasses, className)}
      disabled={disabled || loading}
      {...buttonRest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}
