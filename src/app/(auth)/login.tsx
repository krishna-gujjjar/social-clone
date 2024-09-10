import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Alert } from 'react-native';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Col, Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import { Title } from '@/components/ui/typography';
import { useAuth } from '@/hooks/useAuth';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormSchema = z.infer<typeof formSchema>;

export default (): JSX.Element => {
  const router = useRouter();
  const { login } = useAuth();

  const { control, formState, handleSubmit, reset, setFocus } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = useCallback(
    data => {
      login(data.email, data.password)
        .then(() => {
          reset({ email: '', password: '' });
          router.replace('/');
        })
        .catch(error => Alert.alert('Login Error:', JSON.stringify(error.message)));
    },
    [login, reset, router],
  );

  return (
    <Container className="flex-col justify-between gap-4">
      <Title>Login</Title>
      {formState.isLoading && <Loading />}

      <Col className="gap-4">
        <Input
          name="email"
          // @ts-ignore
          control={control}
          returnKeyType="next"
          label="Email Address"
          iconName="alternate-email"
          placeholder="Enter your email address"
          onSubmitEditing={() => setFocus('password')}
        />
        <Input
          name="password"
          secureTextEntry
          iconName="lock"
          label="Password"
          // @ts-ignore
          control={control}
          returnKeyType="done"
          placeholder="Enter your password"
          onSubmitEditing={handleSubmit(onSubmit)}
        />

        <Button
          title="Login"
          className="bg-blue-500"
          textClassName="text-slate-200"
          onPress={handleSubmit(onSubmit)}
        />
      </Col>

      <Link asChild href="/(auth)/register">
        <Button title="Create an account" className="bg-slate-500" textClassName="text-slate-200" />
      </Link>
    </Container>
  );
};
