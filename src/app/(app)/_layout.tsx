import { Redirect } from 'expo-router';
import { Stack } from 'expo-router';

import { useStore } from '@/services/storages';

export default (): JSX.Element => {
  const isLoggedIn = useStore(state => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};
