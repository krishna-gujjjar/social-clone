import { memo } from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldValues } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import type {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  ReturnKeyTypeOptions,
  TextInputSubmitEditingEventData,
} from 'react-native';

import type { WithClassName } from '@/types/common';
import { cn } from '@/utils/style';
import { ConditionalRender } from '../conditional-render';
import { Inline } from '../container';
import { Ionicons } from '../icons';
import { Paragraph, Tiny } from '../typography';

interface InputProps extends WithClassName {
  name: string;
  label?: string;
  iconName?: string;
  multiline?: boolean;
  placeholder?: string;
  defaultValue?: string;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  control: Control<FieldValues>;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
}

const Component = (props: InputProps): JSX.Element => (
  <Controller
    name={props.name}
    control={props.control}
    defaultValue={props.defaultValue}
    render={controlledProps => (
      <View style={props.style} className={cn('gap-2', props.className ?? '')}>
        <Paragraph className="text-slate-500">{props.label}</Paragraph>
        <Inline
          className={cn(
            'gap-2 overflow-hidden rounded-2xl px-3 py-1',
            controlledProps.fieldState.invalid
              ? 'border border-red-500 bg-red-50'
              : 'border border-slate-300 bg-slate-200',
          )}
        >
          {props.iconName && (
            <Ionicons
              size={24}
              // @ts-ignore
              name={props.iconName}
              className={controlledProps.fieldState.invalid ? 'color-red-500' : 'color-slate-800'}
            />
          )}
          <TextInput
            multiline={props.multiline}
            cursorColor="rgb(59 130 246)"
            placeholder={props.placeholder}
            ref={controlledProps.field.ref}
            keyboardType={props.keyboardType}
            defaultValue={props.defaultValue}
            returnKeyType={props.returnKeyType}
            value={controlledProps.field.value}
            onBlur={controlledProps.field.onBlur}
            onSubmitEditing={props.onSubmitEditing}
            secureTextEntry={props.secureTextEntry}
            numberOfLines={props.multiline ? 5 : 1}
            onChangeText={controlledProps.field.onChange}
            className={cn(
              'w-full font-[GeneralSansMedium] text-2xl',
              props.multiline ? 'h-44' : 'h-12',
            )}
          />
        </Inline>
        <ConditionalRender shouldRender={controlledProps.fieldState.invalid}>
          <Tiny className="text-red-500">{controlledProps.fieldState.error?.message}</Tiny>
        </ConditionalRender>
      </View>
    )}
  />
);

const Input = memo(Component);
Input.displayName = 'Components.UI.Input';
export { Input };
