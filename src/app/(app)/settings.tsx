import { Avatar } from '@piccy/native';
import { Link } from 'expo-router';
import { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Col, Container, Inline } from '@/components/ui/container';
import { Ionicons } from '@/components/ui/icons';
import { Paragraph, Tiny, Title } from '@/components/ui/typography';
import { useAuth } from '@/hooks/useAuth';
import { useStore } from '@/services/storages';

export default (): JSX.Element => {
  const { logout } = useAuth();
  const user = useStore(state => state.userData);

  const onLogout = useCallback(() => {
    logout().then(() => console.log('logged out'));
  }, [logout]);

  return (
    <Container className="gap-6">
      <Inline className="justify-start gap-4 rounded-3xl bg-slate-100 p-4">
        <Avatar
          size="lg"
          rounded="lg"
          value={user?.userId ?? ''}
          source={typeof user?.profileImage === 'string' ? { uri: user?.profileImage } : undefined}
        />
        <Col>
          <Title>
            {user?.name.first ?? 'No'} {user?.name.last ?? 'Name'}
          </Title>
          <Tiny>{user?.email}</Tiny>
        </Col>
      </Inline>

      <Col>
        <Link asChild href="/edit">
          <Button className="flex flex-row bg-slate-200 p-4">
            <Paragraph>Edit Profile</Paragraph>
            <Ionicons name="chevron-forward" size={24} />
          </Button>
        </Link>
      </Col>

      <Button
        title="Logout"
        onPress={onLogout}
        textClassName="text-white"
        className="mt-auto bg-red-500 shadow-lg shadow-red-500"
      />
    </Container>
  );
};
