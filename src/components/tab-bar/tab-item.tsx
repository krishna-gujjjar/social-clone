import { Pressable } from 'react-native';
import { Tiny } from '../ui/typography';

interface TabProps {
  label: string;
  onPress: () => void;
  onLongPress: () => void;
}

export const TabItem = (props: TabProps): JSX.Element => (
  <Pressable
    onPress={props.onPress}
    onLongPress={props.onLongPress}
    className="flex items-center justify-center overflow-hidden p-4"
  >
    <Tiny>{props.label}</Tiny>
  </Pressable>
);
