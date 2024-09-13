import { ResizeMode, Video } from 'expo-av';
import type { AVPlaybackStatus } from 'expo-av';
import { memo, useCallback, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';

import { usePauseable } from '@/hooks/usePauseable';
import type { Post } from '@/services/schema/post';
import { Button } from '../ui/button';
import { Ionicons } from '../ui/icons';
import { Reactions } from './reactions';
import { UserInfo } from './user-info';

interface ReelProps {
  item: Post;
  shouldPlay: boolean;
}

const Component = (props: ReelProps): JSX.Element => {
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const { video, play, pause } = usePauseable(useRef(null), props.shouldPlay);

  const onPress = useCallback(() => {
    if (status?.isLoaded) {
      status.isPlaying
        ? pause('Error on video pause on press')
        : play('Error on video play on press');
    }
  }, [status, play, pause]);

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
          onError={console.error}
          useNativeControls={false}
          resizeMode={ResizeMode.COVER}
          style={{ width: '100%', height: '100%' }}
          posterSource={{ uri: props.item.imageUrl }}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          posterStyle={{ width: '100%', height: '100%', resizeMode: 'cover' }}
          source={{ uri: props.item.videoUrl, overrideFileExtensionAndroid: 'mp4' }}
        />

        {status?.isLoaded && !status.isPlaying && (
          <Button className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 rounded-full bg-slate-100/50">
            <Ionicons name="play" size={48} className="text-slate-100" />
          </Button>
        )}

        <Reactions item={props.item} />

        <UserInfo userId={props.item.userId} caption={props.item.caption} />
      </View>
    </Pressable>
  );
};

const Reel = memo(Component);
export { Reel };
