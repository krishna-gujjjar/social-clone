import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Alert } from 'react-native';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Col, Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import { Heading } from '@/components/ui/typography';
import { useAuth } from '@/hooks/useAuth';

const formSchema = z.object({
  firstName: z.string().min(3).optional(),
  lastName: z.string().min(3).optional(),
  email: z.string().email(),
  password: z.string().min(3),
});

type FormSchema = z.infer<typeof formSchema>;

export default (): JSX.Element => {
  const { register } = useAuth();
  const { control, formState, handleSubmit, setFocus } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = useCallback(
    data => {
      register(data.email, data.password, data?.firstName, data?.lastName)
        .then(console.log)
        .catch(error => Alert.alert('Registration Error: ', JSON.stringify(error?.message)));
    },
    [register],
  );

  return (
    <Container className="gap-8">
      <Heading>Create an Account</Heading>
      {formState.isLoading && <Loading />}

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

      <Link asChild href="/(auth)/login">
        <Button
          className="bg-slate-500"
          textClassName="text-slate-200"
          title="Already have an account"
        />
      </Link>
    </Container>
  );
};
