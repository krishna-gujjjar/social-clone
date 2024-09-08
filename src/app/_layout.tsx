import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import '@/styles/global.css';

SplashScreen.preventAutoHideAsync();

export default (): JSX.Element | null => {
  const [isFontLoaded, haveFontLoadError] = useFonts({
    GeneralSansBold: require('@/assets/fonts/GeneralSans-Bold.otf'),
    GeneralSansSemibold: require('@/assets/fonts/GeneralSans-Semibold.otf'),
    GeneralSansMedium: require('@/assets/fonts/GeneralSans-Medium.otf'),
  });

  useEffect(() => {
    if (isFontLoaded || haveFontLoadError) {
      SplashScreen.hideAsync();
    }
  }, [isFontLoaded, haveFontLoadError]);

  if (!isFontLoaded && !haveFontLoadError) {
    return null;
  }

  return <Slot />;
};
