import { forwardRef, memo } from 'react';
import type { Ref } from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldValues } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import type { KeyboardTypeOptions } from 'react-native';

import type { WithClassName } from '@/types/common';
import { cn } from '@/utils/style';
import { ConditionalRender } from '../conditional-render';
import { Inline } from '../container';
import { MaterialIcon } from '../icons';
import { Label, Tiny } from '../typography';

interface InputProps extends WithClassName {
  name: string;
  label?: string;
  iconName?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  control: Control<FieldValues>;
  keyboardType?: KeyboardTypeOptions;
}

const Component = (props: InputProps, ref: Ref<TextInput>): JSX.Element => (
  <Controller
    name={props.name}
    control={props.control}
    render={controlledProps => (
      <View style={props.style} className={cn('gap-2', props.className ?? '')}>
        <Label>{props.label}</Label>
        <Inline
          className={cn(
            'gap-2 overflow-hidden rounded-2xl px-2 py-1',
            controlledProps.fieldState.invalid
              ? 'border border-red-500 bg-red-50'
              : 'border border-slate-300 bg-slate-200',
          )}
        >
          {props.iconName && (
            <MaterialIcon
              // @ts-ignore
              name={props.iconName}
              className={cn(
                'text-3xl',
                controlledProps.fieldState.invalid ? 'color-red-500' : 'color-slate-800',
              )}
            />
          )}
          <TextInput
            ref={ref}
            numberOfLines={1}
            cursorColor="rgb(59 130 246)"
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            value={controlledProps.field.value}
            onBlur={controlledProps.field.onBlur}
            secureTextEntry={props.secureTextEntry}
            onChangeText={controlledProps.field.onChange}
            className="h-14 w-full font-[GeneralSansMedium] text-2xl"
          />
        </Inline>
        <ConditionalRender shouldRender={controlledProps.fieldState.invalid}>
          <Tiny className="text-red-500">{controlledProps.fieldState.error?.message}</Tiny>
        </ConditionalRender>
      </View>
    )}
  />
);

const ComponentRef = forwardRef(Component);
const Input = memo(ComponentRef);
Input.displayName = 'Components.UI.Input';
export { Input };
