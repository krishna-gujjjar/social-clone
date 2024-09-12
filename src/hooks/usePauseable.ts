import type { Video } from 'expo-av';
import { useNavigation } from 'expo-router';
import type { RefObject } from 'react';
import { useEffect } from 'react';

export const usePauseable = (video: RefObject<Video>, shouldPlay: boolean) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (video.current === null) return;

    if (shouldPlay) {
      video.current.playAsync();
    } else {
      video.current.pauseAsync();
      video.current.setPositionAsync(0);
    }
  }, [shouldPlay, video.current]);

  useEffect(() => {
    const _blur = navigation.addListener('blur', () => {
      video.current?.pauseAsync();
    });

    const focus = navigation.addListener('focus', () => {
      if (shouldPlay) {
        video.current?.playAsync();
      }
    });

    return () => {
      _blur();
      focus();
    };
  }, [navigation.addListener, shouldPlay, video.current]);

  return video;
};
