import { Avatar } from '@piccy/native';
import { Link } from 'expo-router';
import { useMemo } from 'react';

import { MetaData } from '@/components/meta-data';
import { Button } from '@/components/ui/button';
import { Col, Container, Inline } from '@/components/ui/container';
import { Ionicons } from '@/components/ui/icons';
import { Heading, Tiny } from '@/components/ui/typography';
import { useAuth } from '@/hooks/useAuth';

export default (): JSX.Element => {
  const { user } = useAuth();
  const metaData = useMemo(
    () => [
      { title: 'Followers', value: user?.followers.length ?? 0 },
      { title: 'Posts', value: user?.posts.length ?? 0 },
      { title: 'Followings', value: user?.following.length ?? 0 },
    ],
    [user?.followers.length, user?.following.length, user?.posts.length],
  );

  return (
    <Container className="gap-6">
      <Inline>
        <Avatar
          size="lg"
          rounded="lg"
          value={user?.userId ?? ''}
          source={typeof user?.profileImage === 'string' ? { uri: user?.profileImage } : undefined}
        />
        <Link asChild href="/settings">
          <Button>
            <Ionicons name="ellipsis-horizontal" size={24} className="text-slate-800" />
          </Button>
        </Link>
      </Inline>
      <Col className="gap-2">
        <Heading className="capitalize">
          {user?.name.first ?? 'No'} {user?.name.last ?? 'Name'}
        </Heading>
        <Tiny className="h-28 text-justify text-slate-600">{user?.bio ?? 'No bio yet'}</Tiny>
      </Col>

      <MetaData items={metaData} />
    </Container>
  );
};
