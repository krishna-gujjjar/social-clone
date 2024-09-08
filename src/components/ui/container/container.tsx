import type { Ref } from 'react';
import { forwardRef, memo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

import type { WithClassName } from '@/types/common';

interface ContainerProps extends WithClassName, VariantProps<typeof contain> {}

const contain = tv({
  base: 'h-screen w-full bg-slate-300 p-8 overflow-hidden',
  variants: {
    center: {
      true: 'items-center justify-center',
    },
    withoutRounded: {
      true: 'rounded-none',
      false: 'rounded-t-3xl',
    },
  },
  defaultVariants: {
    center: false,
  },
});

const Component = (props: ContainerProps, ref: Ref<View>): JSX.Element => (
  <SafeAreaView>
    <View ref={ref} className={contain(props)}>
      {props.children}
    </View>
  </SafeAreaView>
);

const ComponentRef = forwardRef(Component);
const Container = memo(ComponentRef);
Container.displayName = 'Components.UI.Container';
export { Container };
