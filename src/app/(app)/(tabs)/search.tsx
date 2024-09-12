import { useCallback, useEffect, useState } from 'react';
import { TextInput } from 'react-native';

import { SmallReel } from '@/components/reel';
import { Container, Inline } from '@/components/ui/container';
import { Loading } from '@/components/ui/loading';
import { Tiny, Title } from '@/components/ui/typography';
import { searchPosts } from '@/services/firebase/post';
import type { Post } from '@/services/schema/post';

export default (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback((_terms = '') => {
    setIsLoading(true);
    searchPosts(_terms)
      .then(_post => setPosts(_post))
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const onSearch = useCallback(
    (_terms: string) => {
      fetchPosts(_terms);
    },
    [fetchPosts],
  );

  return (
    <Container className="gap-4">
      <Title>Search Reels</Title>

      {isLoading && <Loading />}

      <Tiny className="text-slate-500">Search</Tiny>
      <TextInput
        inputMode="search"
        onChangeText={onSearch}
        keyboardType="web-search"
        placeholder="Search Reels..."
        className="rounded-lg bg-slate-200 p-4 font-[GeneralSansMedium] text-xl"
      />

      <Inline className="flex-wrap justify-start gap-2">
        {posts.map(post => (
          <SmallReel key={post.postId} item={post} />
        ))}
      </Inline>
    </Container>
  );
};
