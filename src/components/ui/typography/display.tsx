import { forwardRef, memo } from 'react';
import type { Ref } from 'react';
import { Text } from 'react-native';

import { typography } from './typography';
import type { TypographyProps } from './typography';

const Component = (props: TypographyProps, ref: Ref<Text>): JSX.Element => (
  <Text ref={ref} className={typography({ ...props, type: 'display' })}>
    {props.children}
  </Text>
);

const ComponentRef = forwardRef(Component);
const Display = memo(ComponentRef);
Display.displayName = 'Components.UI.Typography.Display';
export { Display };
