import { Redirect, Slot } from 'expo-router';

import { useAuth } from '@/hooks/useAuth';

export default (): JSX.Element => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Slot />;
};
