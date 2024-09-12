import { memo } from 'react';
import { ActivityIndicator, View } from 'react-native';

const Component = (): JSX.Element => {
  return (
    <View className="absolute top-0 right-0 bottom-0 left-0 z-50 flex-1 items-center justify-center bg-black/50">
      <ActivityIndicator className="text-blue-600" size="large" />
    </View>
  );
};

const Loading = memo(Component);
Loading.displayName = 'Components.UI.Loading';
export { Loading };
