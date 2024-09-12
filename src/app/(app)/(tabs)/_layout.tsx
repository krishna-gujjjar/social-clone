import { Tabs } from 'expo-router';

import { TabBar } from '@/components/tab-bar';

export default (): JSX.Element => (
  <Tabs tabBar={props => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
    <Tabs.Screen name="index" options={{ title: 'Home' }} />
    <Tabs.Screen name="create" options={{ title: 'Create' }} />
    <Tabs.Screen name="search" options={{ title: 'Search' }} />
    <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
  </Tabs>
);
