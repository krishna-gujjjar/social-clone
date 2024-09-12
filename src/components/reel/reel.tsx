import { ResizeMode, Video } from 'expo-av';
import type { AVPlaybackStatus } from 'expo-av';
import { memo, useCallback, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';

import { usePauseable } from '@/hooks/usePauseable';
import type { Post } from '@/services/schema/post';

interface ReelProps {
  item: Post;
  shouldPlay: boolean;
}

const Component = (props: ReelProps): JSX.Element => {
  const video = usePauseable(useRef(null), props.shouldPlay);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);

  const onPress = useCallback(() => {
    if (status?.isLoaded) {
      status.isPlaying ? video.current?.pauseAsync() : video.current?.playAsync();
    }
  }, [status, video.current]);

  const onPlaybackStatusUpdate = useCallback((_status: AVPlaybackStatus) => {
    setStatus(() => _status);
  }, []);

  return (
    <Pressable onPress={onPress}>
      <View className="h-screen w-full">
        <Video
          isLooping
          usePoster
          ref={video}
          useNativeControls={false}
          resizeMode={ResizeMode.COVER}
          source={{ uri: props.item.videoUrl }}
          style={{ width: '100%', height: '100%' }}
          posterSource={{ uri: props.item.imageUrl }}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          posterStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        />
      </View>
    </Pressable>
  );
};

const Reel = memo(Component);
export { Reel };
