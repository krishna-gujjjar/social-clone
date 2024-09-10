import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { TabItem } from './tab-item';

export const TabBar = (props: BottomTabBarProps) => (
  <View className="flex flex-row items-center justify-between bg-blue-500 pt-4 pb-10">
    {props.state.routes.map((route, index) => {
      const { options } = props.descriptors[route.key];
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
            ? options.title
            : route.name;

      const isFocused = props.state.index === index;

      const onPress = () => {
        const event = props.navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          props.navigation.navigate(route.name, route.params);
        }
      };

      const onLongPress = () => {
        props.navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };

      return (
        <TabItem
          key={route.key}
          onPress={onPress}
          label={label as string}
          onLongPress={onLongPress}
        />
      );
    })}
  </View>
);
