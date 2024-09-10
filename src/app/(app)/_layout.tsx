import { Redirect, Tabs } from 'expo-router';

import { useStore } from '@/services/storages';

export default (): JSX.Element => {
  const isLoggedIn = useStore(state => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="search" options={{ title: 'Search' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
};
