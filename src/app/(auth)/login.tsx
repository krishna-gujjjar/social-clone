import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Alert } from 'react-native';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Col, Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Title } from '@/components/ui/typography';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export default (): JSX.Element => {
  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = useCallback(data => {
    Alert.alert(JSON.stringify(data));
  }, []);
  const onCreateAccount = useCallback(() => {}, []);

  return (
    <Container className="flex-col justify-between gap-4">
      <Title>Login</Title>

      <Col className="gap-4">
        <Input
          name="email"
          // @ts-ignore
          control={control}
          label="Email Address"
          iconName="alternate-email"
          placeholder="Enter your email address"
        />
        <Input
          name="password"
          secureTextEntry
          iconName="lock"
          label="Password"
          // @ts-ignore
          control={control}
          placeholder="Enter your password"
        />

        <Button
          title="Login"
          onPress={handleSubmit(onSubmit)}
          className="bg-blue-500"
          textClassName="text-slate-200"
        />
      </Col>

      <Button
        onPress={onCreateAccount}
        title="Create an account"
        className="bg-slate-500"
        textClassName="text-slate-200"
      />
    </Container>
  );
};
