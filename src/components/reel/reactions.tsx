import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { reactionUserAction } from '@/services/firebase/metaData';
import type { Post } from '@/services/schema/post';
import { useStore } from '@/services/storages';
import { cn } from '@/utils/style';
import { Button } from '../ui/button';
import { Col } from '../ui/container';
import { Ionicons } from '../ui/icons';
import { Tiny } from '../ui/typography';

type Action = 'like' | 'comment';

interface ActionButtonProps {
  type: Action;
  value: number;
  isLiked: boolean;
  onPress: () => void;
}

interface ReactionsProps {
  item: Post;
}

const ActionButton = (props: ActionButtonProps): JSX.Element => (
  <Button onPress={props.onPress} className="rounded-xl bg-transparent p-0">
    <View className="-top-[35%] -right-[35%] absolute z-10 size-6 items-center justify-center rounded-full bg-blue-500/80">
      <Tiny className=" text-slate-100 text-xs">{props.value}</Tiny>
    </View>
    {props.type === 'like' ? (
      <Ionicons
        size={30}
        name="heart"
        className={cn(props.isLiked ? 'text-red-400' : 'text-slate-300')}
      />
    ) : (
      <Ionicons name="chatbox" size={30} className="text-slate-300" />
    )}
  </Button>
);

const Reactions = (props: ReactionsProps): JSX.Element => {
  const currentUser = useStore.getState().userData;
  const [postData, setPostData] = useState<Post>(props.item);

  const isLiked = useMemo(
    () => postData?.likes.includes(currentUser?.userId ?? '') ?? false,
    [postData?.likes, currentUser?.userId],
  );

  const metaData: { id: Action; value: number }[] = useMemo(
    () => [
      { id: 'like', value: postData?.likes.length ?? 0 },
      { id: 'comment', value: postData?.comments.length ?? 0 },
    ],
    [postData],
  );

  const onReaction = useCallback(() => {
    reactionUserAction(postData.postId, currentUser?.userId as string, isLiked).then(_postData => {
      if (typeof _postData !== 'undefined') {
        setPostData(() => _postData);
      }
    });
  }, [currentUser?.userId, isLiked, postData.postId]);

  const onComment = () => {};

  return (
    <Col className="absolute right-[5%] bottom-[15%] flex-col items-center gap-10">
      {metaData.map(meta => (
        <ActionButton
          key={meta.id}
          type={meta.id}
          isLiked={isLiked}
          value={meta.value}
          onPress={meta.id === 'like' ? onReaction : onComment}
        />
      ))}
    </Col>
  );
};

export { Reactions };
