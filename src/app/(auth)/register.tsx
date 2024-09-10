import { Link } from 'expo-router';

import { Button } from '@/components/ui/button';
import { Col, Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Heading } from '@/components/ui/typography';

export default (): JSX.Element => (
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
      <Button title="Register" className="bg-blue-500" textClassName="text-slate-200" />
    </Col>

    <Link asChild href="/(auth)/login">
      <Button
        className="bg-slate-500"
        title="Already have an account"
        textClassName="text-slate-200"
      />
    </Link>
  </Container>
);
