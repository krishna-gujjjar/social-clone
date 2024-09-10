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
  firstName: z.string().min(3).optional(),
  lastName: z.string().min(3).optional(),
  email: z.string().email(),
  password: z.string().min(3),
});

type FormSchema = z.infer<typeof formSchema>;

export default (): JSX.Element => {
  const router = useRouter();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, reset, setFocus } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = useCallback(
    data => {
      setIsLoading(true);
      register(data.email, data.password, data?.firstName, data?.lastName)
        .then(() => {
          reset({ email: '', password: '', firstName: '', lastName: '' });
          router.replace('/');
        })
        .catch(error => Alert.alert('Registration Error: ', JSON.stringify(error?.message)))
        .finally(() => setIsLoading(false));
    },
    [register, router, reset],
  );

  return (
    <Container>
      <Image source={require('@/assets/images/app-icon.png')} className="size-24 rounded-3xl" />
      <Col className="my-8">
        <Heading>Welcome!</Heading>
        <Label className="text-slate-600">Crate a new account.</Label>
      </Col>

      {isLoading && <Loading />}

      <Col className="gap-4">
        <Input
          name="firstName"
          // @ts-ignore
          control={control}
          iconName="person"
          label="First Name"
          returnKeyType="next"
          placeholder="Enter your first name"
          onSubmitEditing={() => setFocus('lastName')}
        />
        <Input
          name="lastName"
          // @ts-ignore
          control={control}
          label="Last Name"
          iconName="person"
          returnKeyType="next"
          placeholder="Enter your last name"
          onSubmitEditing={() => setFocus('email')}
        />
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
          title="Register"
          className="bg-blue-500"
          textClassName="text-slate-200"
          onPress={handleSubmit(onSubmit)}
        />
      </Col>

      <Link asChild href="/(auth)/login" className="absolute bottom-10 self-center">
        <Button
          textClassName="text-slate-200"
          title="Already have an account"
          className="w-full bg-slate-500"
        />
      </Link>
    </Container>
  );
};
