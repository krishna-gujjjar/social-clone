import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import type { ViewToken } from 'react-native';

import { Reel } from '@/components/reel';
import { Container } from '@/components/ui/container';
import { getPosts } from '@/services/firebase/post';
import type { Post } from '@/services/schema/post';

export default (): JSX.Element => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentViewableIndex, setCurrentViewableIndex] = useState(0);

  const onFetchPosts = useCallback(async () => {
    const _posts = await getPosts();
    setPosts(_posts);
  }, []);

  const onViewableItemsChanged = useCallback((info: { viewableItems: Array<ViewToken<Post>> }) => {
    if (info.viewableItems.length > 0 && typeof info.viewableItems[0].index === 'number') {
      setCurrentViewableIndex(info.viewableItems[0].index);
    }
  }, []);

  useEffect(() => {
    onFetchPosts();
  }, [onFetchPosts]);

  return (
    <Container className="p-0">
      <FlatList
        data={posts}
        pagingEnabled
        horizontal={false}
        keyExtractor={item => item.postId}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item, index }) => (
          <Reel item={item} shouldPlay={currentViewableIndex === index} />
        )}
      />
    </Container>
  );
};
