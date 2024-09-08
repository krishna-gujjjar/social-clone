import { useCallback } from 'react';
import { TextInput, View } from 'react-native';

import { Button } from '@/components/ui/button/button';
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
        <Button
          title="Login"
          onPress={onSubmit}
          className="bg-blue-500"
          textClassName="text-slate-200"
        />
      </View>

      <Button
        className="bg-slate-500"
        onPress={onCreateAccount}
        title="Create an account"
        textClassName="text-slate-200"
      />
    </Container>
  );
};
