import type { Ref } from 'react';
import { forwardRef, memo } from 'react';
import { View } from 'react-native';

import type { WithClassName } from '@/types/common';
import { cn } from '@/utils/style';

interface ColProps extends WithClassName {}

const Component = (props: ColProps, ref: Ref<View>): JSX.Element => (
  <View ref={ref} style={props.style} className={cn('flex flex-col', props.className ?? '')}>
    {props.children}
  </View>
);

const ComponentRef = forwardRef(Component);
const Col = memo(ComponentRef);
Col.displayName = 'Components.UI.Container.Col';
export { Col };
