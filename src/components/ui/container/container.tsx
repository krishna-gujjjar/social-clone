import type { Ref } from 'react';
import { forwardRef, memo } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

import type { WithClassName } from '@/types/common';

interface ContainerProps extends WithClassName, VariantProps<typeof contain> {
  scroll?: boolean;
}

const contain = tv({
  base: 'h-screen w-full overflow-hidden bg-slate-300 p-8',
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
    withoutRounded: false,
  },
});

const Component = (props: ContainerProps, ref: Ref<View | ScrollView>): JSX.Element => (
  <SafeAreaView className="flex-1">
    {props.scroll ? (
      <ScrollView
        nestedScrollEnabled
        ref={ref as Ref<ScrollView>}
        contentContainerClassName={props.className}
        className={contain({ center: props.center, withoutRounded: props.withoutRounded })}
      >
        {props.children}
      </ScrollView>
    ) : (
      <View ref={ref as Ref<View>} className={contain(props)}>
        {props.children}
      </View>
    )}
  </SafeAreaView>
);

const ComponentRef = forwardRef(Component);
const Container = memo(ComponentRef);
Container.displayName = 'Components.UI.Container';
export { Container };
