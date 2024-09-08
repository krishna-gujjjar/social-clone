import type { PropsWithChildren } from 'react';
import type { ViewStyle } from 'react-native';
import type { VariantProps } from 'tailwind-variants';

export interface WithClassName extends PropsWithChildren {
  className?: string;
  style?: ViewStyle;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export interface WithClassNameVariants<T extends (...args: any) => any>
  extends WithClassName,
    // @ts-ignore
    VariantProps<T> {}
