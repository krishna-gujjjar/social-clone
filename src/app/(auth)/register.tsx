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
  const { control, handleSubmit, formState } = useForm<FormSchema>({
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

      <Col className="gap-4">
        <Input
          name="firstName"
          // @ts-ignore
          control={control}
          label="First Name"
          iconName="person"
          placeholder="Enter your first name"
        />
        <Input
          name="lastName"
          // @ts-ignore
          control={control}
          label="Last Name"
          iconName="person"
          placeholder="Enter your last name"
        />
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
          title="Register"
          className="bg-blue-500"
          textClassName="text-slate-200"
          disabled={formState.isLoading}
          onPress={handleSubmit(onSubmit)}
        />
      </Col>

      <Link asChild href="/(auth)/login" disabled={formState.isLoading}>
        <Button
          className="bg-slate-500"
          disabled={formState.isLoading}
          title="Already have an account"
          textClassName="text-slate-200"
        />
      </Link>
    </Container>
  );
};
