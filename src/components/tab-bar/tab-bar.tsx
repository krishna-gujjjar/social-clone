import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { TabItem } from './tab-item';

export const TabBar = (props: BottomTabBarProps) => {
  const x = useSharedValue(0);
  const [tabBarDimensions, setTabBarDimensions] = useState({ height: 24, width: 100 });
  const tabWidth = tabBarDimensions.width / props.state.routes.length;

  const animatedCircleStyle = useAnimatedStyle(() => {
    const translateX = withSpring(x.value);

    return { transform: [{ translateX }] };
  });

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setTabBarDimensions(e.nativeEvent.layout);
  }, []);

  return (
    <View
      onLayout={onLayout}
      className="absolute bottom-10 flex flex-row items-center justify-between self-center rounded-full bg-slate-100 shadow-lg shadow-slate-800"
    >
      <Animated.View
        style={animatedCircleStyle}
        className="absolute mx-2 size-16 rounded-full bg-blue-500"
      />
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
          x.value = withTiming(tabWidth * index, { duration: 200 });

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
            isFocused={isFocused}
            routeName={route.name}
            label={label as string}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
};
