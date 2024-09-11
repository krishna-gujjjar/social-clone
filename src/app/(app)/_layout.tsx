import { Redirect, Slot } from 'expo-router';

import { useStore } from '@/services/storages';

export default (): JSX.Element => {
  const isLoggedIn = useStore(state => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Slot />;
};
