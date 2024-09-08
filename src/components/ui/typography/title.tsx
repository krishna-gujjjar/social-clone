import { forwardRef, memo } from 'react';
import type { Ref } from 'react';
import { Text } from 'react-native';

import type { TypographyProps } from './typography';
import { typography } from './typography';

const Component = (props: TypographyProps, ref: Ref<Text>): JSX.Element => (
  <Text ref={ref} className={typography({ ...props, type: 'title' })}>
    {props.children}
  </Text>
);

const ComponentRef = forwardRef(Component);
const Title = memo(ComponentRef);
Title.displayName = 'Components.UI.Typography.Title';
export { Title };
