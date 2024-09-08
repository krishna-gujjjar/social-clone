import { forwardRef, memo } from 'react';
import type { Ref } from 'react';
import { TextInput, View } from 'react-native';
import type { KeyboardTypeOptions } from 'react-native';

import type { WithClassName } from '@/types/common';
import { cn } from '@/utils/style';
import { Label } from '../typography';

interface InputProps extends WithClassName {
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

const Component = (props: InputProps, ref: Ref<TextInput>): JSX.Element => (
  <View style={props.style} className={cn('', props.className ?? '')}>
    <Label>{props.label}</Label>
    <TextInput
      ref={ref}
      numberOfLines={1}
      cursorColor="rgb(59 130 246)"
      placeholder={props.placeholder}
      keyboardType={props.keyboardType}
      secureTextEntry={props.secureTextEntry}
      className="h-14 w-full font-[GeneralSansMedium] text-2xl"
    />
  </View>
);

const ComponentRef = forwardRef(Component);
const Input = memo(ComponentRef);
Input.displayName = 'Components.UI.Input';
export { Input };
