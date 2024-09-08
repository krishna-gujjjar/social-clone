import { forwardRef, memo } from 'react';
import type { Ref } from 'react';
import { View } from 'react-native';

import type { WithClassName } from '@/types/common';
import { cn } from '@/utils/style';

interface InlineProps extends WithClassName {}

const Component = (props: InlineProps, ref: Ref<View>): JSX.Element => (
  <View
    ref={ref}
    className={cn('flex flex-row items-center justify-between', props.className ?? '')}
  >
    {props.children}
  </View>
);

const ComponentRef = forwardRef(Component);
const Inline = memo(ComponentRef);
Inline.displayName = 'Components.UI.Container.Inline';
export { Inline };
