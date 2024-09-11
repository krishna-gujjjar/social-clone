import { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Title } from '@/components/ui/typography';
import { useAuth } from '@/hooks/useAuth';

export default (): JSX.Element => {
  const { logout } = useAuth();

  const onLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  return (
    <Container center className="gap-4">
      <Title>The app Page</Title>

      <Button
        title="Logout"
        onPress={onLogout}
        textClassName="text-white"
        className="bg-orange-500 px-4"
      />
    </Container>
  );
};
