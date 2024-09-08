import { forwardRef, memo } from 'react';
import type { Ref } from 'react';
import { Text } from 'react-native';

import type { TypographyProps } from './typography';
import { typography } from './typography';

const Component = (props: TypographyProps, ref: Ref<Text>): JSX.Element => (
  <Text ref={ref} className={typography({ ...props, type: 'heading' })}>
    {props.children}
  </Text>
);

const ComponentRef = forwardRef(Component);
const Heading = memo(ComponentRef);
Heading.displayName = 'Components.UI.Typography.Heading';
export { Heading };
