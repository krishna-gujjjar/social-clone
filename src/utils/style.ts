import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...classNames: string[]): string => twMerge(clsx(classNames));
