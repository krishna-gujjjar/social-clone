import type { Video } from 'expo-av';
import { useNavigation } from 'expo-router';
import type { RefObject } from 'react';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Alert } from 'react-native';

export const usePauseable = (video: RefObject<Video>, shouldPlay: boolean) => {
  const navigation = useNavigation();
  const [isLoaded, setIsLoaded] = useState(false);

  const play = useCallback(
    (errorTitle = 'Error on video play') => {
      if (video.current === null || !isLoaded) return;

      video.current
        ?.playAsync()
        .then(() => {})
        .catch(error => {
          Alert.alert(errorTitle, JSON.stringify(error?.message));
        });
    },
    [video.current, isLoaded],
  );

  const pause = useCallback(
    (errorTitle = 'Error on video pause') => {
      if (video.current === null || !isLoaded) return;
      video.current
        ?.pauseAsync()
        .then(() => {})
        .catch(error => {
          Alert.alert(errorTitle, JSON.stringify(error?.message));
        });
    },
    [video.current, isLoaded],
  );

  useEffect(() => {
    if (video.current === null) return;

    video.current
      ?.getStatusAsync()
      .then(status => {
        setIsLoaded(status.isLoaded);
      })
      .catch(console.log);
  }, [video.current]);

  useLayoutEffect(() => {
    if (shouldPlay) {
      play('Error on first video play from useLayoutEffect');
    } else {
      pause('Error on first video pause from useLayoutEffect');
    }
  }, [shouldPlay, play, pause]);

  useLayoutEffect(() => {
    const _blur = navigation.addListener('blur', () => {
      pause('Error on pause video on blur from useLayoutEffect');
    });

    const focus = navigation.addListener('focus', () => {
      if (shouldPlay) {
        play('Error on play video on focus from useLayoutEffect');
      }
    });

    return () => {
      _blur();
      focus();
    };
  }, [navigation.addListener, shouldPlay, play, pause]);

  return { video, pause, play };
};
