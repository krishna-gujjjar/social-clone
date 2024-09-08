import { forwardRef, memo } from 'react';
import type { Ref } from 'react';
import { Text } from 'react-native';

import type { TypographyProps } from './typography';
import { typography } from './typography';

const Component = (props: TypographyProps, ref: Ref<Text>): JSX.Element => (
  <Text ref={ref} className={typography({ ...props, type: 'paragraph' })}>
    {props.children}
  </Text>
);

const ComponentRef = forwardRef(Component);
const Paragraph = memo(ComponentRef);
Paragraph.displayName = 'Components.UI.Typography.Paragraph';
export { Paragraph };
