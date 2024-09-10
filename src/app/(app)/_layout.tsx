// import { MaterialIcons } from '@expo/vector-icons';
// import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Redirect, Tabs } from 'expo-router';
// import { useState } from 'react';
// import { Pressable, View } from 'react-native';
// import Animated, {
//   runOnJS,
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
//   withTiming,
// } from 'react-native-reanimated';

import { TabBar } from '@/components/tab-bar';
import { useStore } from '@/services/storages';

// const CustomTabBar = (props: BottomTabBarProps) => {
//   const x = useSharedValue(1);
//   const [indexKey, setIndexKey] = useState(0);

//   const translateX = useAnimatedStyle(() => ({
//     transform: [{ translateX: withSpring(x.value * indexKey) }],
//   }));

//   return (
//     <View className="absolute bottom-10 flex flex-row items-center gap-1 self-center rounded-full bg-slate-400/50 p-1 shadow-lg shadow-slate-800">
//       <Animated.View
//         style={translateX}
//         className="absolute m-1 h-full w-1/2 rounded-full bg-white"
//       />

//       {props.state.routes.map((route, index) => {
//         const { options } = props.descriptors[route.key];

//         const isFocused = props.state.index === index;

//         const onKeyPress = () => {
//           setIndexKey(index);

//           const event = props.navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             props.navigation.navigate(route.name, route.params);
//           }
//         };

//         const onPress = () => {
//           x.value = withTiming(64 * index, {}, () => {
//             runOnJS(onKeyPress)();
//           });
//         };

//         const onLongPress = () => {
//           props.navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         return (
//           <Pressable
//             key={route.key}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             className="flex items-center justify-center overflow-hidden p-4"
//           >
//             {typeof options.tabBarIcon !== 'undefined' &&
//               options.tabBarIcon({
//                 size: 32,
//                 focused: isFocused,
//                 color: isFocused ? 'black' : 'gray',
//               })}
//           </Pressable>
//         );
//       })}
//     </View>
//   );
// };

export default (): JSX.Element => {
  const isLoggedIn = useStore(state => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs tabBar={props => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="search" options={{ title: 'Search' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
};
