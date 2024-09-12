import { Avatar } from '@piccy/native';
import { Link } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';

import { MetaData } from '@/components/meta-data';
import { SmallReel } from '@/components/reel';
import { Button } from '@/components/ui/button';
import { Col, Container, Inline } from '@/components/ui/container';
import { Ionicons } from '@/components/ui/icons';
import { Loading } from '@/components/ui/loading';
import { Heading, Tiny } from '@/components/ui/typography';
import { useAuth } from '@/hooks/useAuth';
import { postsById } from '@/services/firebase/post';
import type { Post } from '@/services/schema/post';

export default (): JSX.Element => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const metaData = useMemo(
    () => [
      { id: '1', title: 'Followers', value: user?.followers.length ?? 0 },
      { id: '2', title: 'Posts', value: user?.posts.length ?? 0 },
      { id: '3', title: 'Followings', value: user?.following.length ?? 0 },
    ],
    [user?.followers.length, user?.following.length, user?.posts.length],
  );

  const fetchPosts = useCallback(() => {
    if (typeof user?.userId === 'string') {
      setIsLoading(true);
      postsById(user?.userId)
        .then(_post => {
          setPosts(_post);
        })
        .catch(console.log)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user?.userId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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

      <View className="relative h-[58.5%] w-full overflow-hidden rounded-3xl">
        {isLoading && <Loading />}
        <Inline className="flex-wrap justify-start gap-2">
          {posts.map(post => (
            <SmallReel key={post.postId} item={post} />
          ))}
        </Inline>
      </View>
    </Container>
  );
};
