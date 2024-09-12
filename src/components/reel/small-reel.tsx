import type { Post } from '@/services/schema/post';
import { Image, Pressable } from 'react-native';

interface SmallReelProps {
  item: Post;
}

export const SmallReel = (props: SmallReelProps): JSX.Element => (
  <Pressable className="basis-[31.9%] overflow-hidden rounded-2xl">
    <Image source={{ uri: props.item.imageUrl }} className="h-44 w-full" />
  </Pressable>
);
