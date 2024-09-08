import { forwardRef, memo } from 'react';
import type { Ref } from 'react';
import { Text } from 'react-native';

import type { TypographyProps } from './typography';
import { typography } from './typography';

const Component = (props: TypographyProps, ref: Ref<Text>): JSX.Element => (
  <Text ref={ref} className={typography({ ...props, type: 'tiny' })}>
    {props.children}
  </Text>
);

const ComponentRef = forwardRef(Component);
const Tiny = memo(ComponentRef);
Tiny.displayName = 'Components.UI.Typography.Tiny';
export { Tiny };
