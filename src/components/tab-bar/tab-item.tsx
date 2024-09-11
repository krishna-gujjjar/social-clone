import { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { icons } from '@/constants/icons';
import { Tiny } from '../ui/typography';

interface TabProps {
  label: string;
  routeName: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

const AnimatedText = Animated.createAnimatedComponent(Tiny);

export const TabItem = (props: TabProps): JSX.Element => {
  const x = useSharedValue(0);

  useEffect(() => {
    x.value = withSpring(
      typeof props.isFocused === 'boolean' ? (props.isFocused ? 1 : 0) : props.isFocused,
      { duration: 350 },
    );
  }, [props.isFocused, x]);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = withSpring(interpolate(x.value, [0, 1], [1, 1.3]), { duration: 50 });
    const top = withSpring(interpolate(x.value, [0, 1], [1, 12]));

    return { top, transform: [{ scale }] };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(x.value, [0, 1], [1, 0]);
    const scale = withSpring(interpolate(x.value, [1, 0], [0, 1]));

    return { color: '#475569', fontSize: 12, opacity, transform: [{ scale }] };
  });

  return (
    <Pressable
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      className="flex size-20 items-center justify-center overflow-hidden p-4"
    >
      <Animated.View style={animatedStyle}>
        {icons[props.routeName]({ color: props.isFocused ? '#fff' : '#475569', size: 24 })}
      </Animated.View>
      <AnimatedText style={animatedTextStyle}>{props.label}</AnimatedText>
    </Pressable>
  );
};
