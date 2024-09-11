import { memo } from 'react';
import { View } from 'react-native';

const Component = (): JSX.Element => <View className="h-12 w-[4] rounded-2xl bg-slate-400" />;

const Separator = memo(Component);
Separator.displayName = 'Components.UI.Separator';
export { Separator };
