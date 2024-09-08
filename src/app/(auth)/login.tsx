import { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Col, Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Title } from '@/components/ui/typography';

export default (): JSX.Element => {
  const onSubmit = useCallback(() => {}, []);
  const onCreateAccount = useCallback(() => {}, []);

  return (
    <Container className="flex-col justify-between gap-4">
      <Title>Login</Title>

      <Col className="gap-4">
        <Input label="Email Address" placeholder="Enter your email address" />
        <Input secureTextEntry label="Password" placeholder="Enter your password" />

        <Button
          title="Login"
          onPress={onSubmit}
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
