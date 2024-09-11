import { Avatar } from '@piccy/native';
import { Link } from 'expo-router';

import { Button } from '@/components/ui/button';
import { Col, Container, Inline } from '@/components/ui/container';
import { Ionicons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';
import { Heading, Tiny, Title } from '@/components/ui/typography';
import { useStore } from '@/services/storages';

export default (): JSX.Element => {
  const user = useStore(state => state.userData);

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
        <Heading>
          {user?.name.first ?? 'No'} {user?.name.last ?? 'Name'}
        </Heading>
        <Tiny className="h-28 text-justify text-slate-600">{user?.bio ?? 'No bio yet'}</Tiny>
      </Col>
      <Inline className="rounded-3xl bg-slate-100 px-6 py-4 shadow-lg shadow-slate-500">
        <Col className="items-center">
          <Title>{user?.followers.length}</Title>
          <Tiny className="text-slate-600">Followers</Tiny>
        </Col>
        <Separator />
        <Col className="items-center">
          <Title>{user?.following.length}</Title>
          <Tiny className="text-slate-600">Followings</Tiny>
        </Col>
        <Separator />
        <Col className="items-center">
          <Title>{user?.posts.length}</Title>
          <Tiny className="text-slate-600">Posts</Tiny>
        </Col>
      </Inline>
    </Container>
  );
};
