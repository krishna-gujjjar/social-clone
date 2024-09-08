import { useCallback } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { Container } from '@/components/ui/container';
import { Label, Title } from '@/components/ui/typography';

export default (): JSX.Element => {
  const onSubmit = useCallback(() => {}, []);
  const onCreateAccount = useCallback(() => {}, []);

  return (
    <Container className="flex-col justify-between gap-4">
      <Title>Login</Title>

      <View className="gap-4">
        <View>
          <Label>Email</Label>
          <TextInput
            numberOfLines={1}
            placeholder="Email Address"
            keyboardType="email-address"
            cursorColor="rgb(59 130 246)"
            className="h-14 w-full font-[GeneralSansMedium] text-2xl"
          />
        </View>

        <View>
          <Label>Password</Label>
          <TextInput
            secureTextEntry
            numberOfLines={1}
            placeholder="Password"
            keyboardType="email-address"
            cursorColor="rgb(59 130 246)"
            className="h-14 w-full font-[GeneralSansMedium] text-2xl"
          />
        </View>
        <Pressable
          onPress={onSubmit}
          className="items-center justify-between rounded-2xl bg-blue-500 p-3"
        >
          <Label className="text-center text-white">Login</Label>
        </Pressable>
      </View>

      <Pressable
        onPress={onCreateAccount}
        className="items-center justify-between rounded-2xl bg-slate-500 p-3"
      >
        <Label className="text-center text-white">Create an account</Label>
      </Pressable>
    </Container>
  );
};
