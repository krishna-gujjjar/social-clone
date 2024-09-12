import { collection, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import type { DocumentData, QuerySnapshot } from 'firebase/firestore';

import { now } from '@/utils/common';
import { postSchema } from '../schema/post';
import type { Post } from '../schema/post';
import { db } from './firebase';
import { uploadMedia } from './media';

const postRef = collection(db, 'posts');

const _extractSnapshots = (snapshots: QuerySnapshot<DocumentData, DocumentData>) => {
  const extracts: Post[] = [];

  // biome-ignore lint/complexity/noForEach: <explanation>
  snapshots.forEach(documentSnapshot => {
    const post = postSchema.safeParse(documentSnapshot.data());
    if (post.success) {
      extracts.push(post.data);
    }
  });

  return extracts;
};

const createPost = async (
  userId: string,
  imageSource: string,
  videoSource: string,
  caption: string,
) => {
  const imageUrl = await uploadMedia(imageSource, 'image');
  const videoUrl = await uploadMedia(videoSource, 'video');

  const ref = doc(postRef);
  return await setDoc(ref, {
    postId: ref.id,
    userId: userId,
    caption: caption,
    isReel: true,
    imageUrl: imageUrl,
    videoUrl: videoUrl,
    likes: [],
    comments: [],
    createdAt: now,
    updatedAt: now,
  });
};

const getPosts = async () => {
  const q = query(postRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  return _extractSnapshots(snapshot);
};

export { createPost, getPosts };
