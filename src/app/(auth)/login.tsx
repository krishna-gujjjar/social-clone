import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Alert, Image } from 'react-native';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Col, Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import { Heading, Label } from '@/components/ui/typography';
import { useAuth } from '@/hooks/useAuth';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormSchema = z.infer<typeof formSchema>;

export default (): JSX.Element => {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, reset, setFocus } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = useCallback(
    data => {
      setIsLoading(true);
      login(data.email, data.password)
        .then(() => {
          reset({ email: '', password: '' });
          router.replace('/');
        })
        .catch(error => Alert.alert('Login Error:', JSON.stringify(error.message)))
        .finally(() => setIsLoading(false));
    },
    [login, reset, router],
  );

  return (
    <Container>
      <Image source={require('@/assets/images/app-icon.png')} className="size-24 rounded-3xl" />
      <Col className="my-12">
        <Heading>Welcome Back!</Heading>
        <Label className="text-slate-600">Login to continue.</Label>
      </Col>

      {isLoading && <Loading />}

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

      <Link asChild href="/(auth)/register" className="absolute bottom-10 self-center">
        <Button
          title="Create an account"
          textClassName="text-slate-200"
          className="w-full bg-slate-500"
        />
      </Link>
    </Container>
  );
};
