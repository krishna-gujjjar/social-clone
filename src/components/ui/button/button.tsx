import { forwardRef, memo } from 'react';
import type { Ref } from 'react';
import { Pressable } from 'react-native';
import type { View } from 'react-native';

import type { WithClassName } from '@/types/common';
import { cn } from '@/utils/style';
import { Label } from '../typography';

interface ButtonProps extends WithClassName {
  title?: string;
  disabled?: boolean;
  textClassName?: string;
  onPress?: () => void;
}

const Component = (props: ButtonProps, ref: Ref<View>) => (
  <Pressable
    ref={ref}
    style={props.style}
    onPress={props.onPress}
    disabled={props.disabled}
    className={cn('items-center justify-between rounded-2xl p-3', props.className ?? '')}
  >
    {props.children || <Label className={props.textClassName}>{props.title}</Label>}
  </Pressable>
);

const ComponentRef = forwardRef(Component);
const Button = memo(ComponentRef);
Button.displayName = 'Components.UI.Button';
export { Button };
