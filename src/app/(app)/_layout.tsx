import { Redirect, Slot } from 'expo-router';

export default (): JSX.Element => {
  if (true) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Slot />;
};
