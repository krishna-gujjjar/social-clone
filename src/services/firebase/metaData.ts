import { arrayRemove, arrayUnion } from 'firebase/firestore';

import { useStore } from '../storages';
import { getPost, updatePost } from './post';
import { updateUser } from './user';

const followUserAction = async (userId: string, isFollowing: boolean) => {
  const currentUser = useStore.getState().userData;

  if (typeof currentUser?.userId !== 'undefined') {
    await updateUser(currentUser?.userId, {
      // @ts-ignore
      following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
    });

    await updateUser(
      userId,
      {
        // @ts-ignore
        followers: isFollowing ? arrayRemove(currentUser?.userId) : arrayUnion(currentUser?.userId),
      },
      false,
    );
  }
};

const reactionUserAction = async (postId: string, userId: string, isLiked: boolean) => {
  await updatePost(postId, {
    // @ts-ignore
    likes: isLiked ? arrayRemove(userId) : arrayUnion(userId),
  });

  return await getPost(postId);
};

export { followUserAction, reactionUserAction };
