import { type DocumentData, collection, doc, getDocs, setDoc } from 'firebase/firestore';

import { now } from '@/utils/common';
import { postSchema } from '../schema/post';
import type { Post } from '../schema/post';
import { db } from './firebase';
import { uploadMedia } from './media';

const createPost = async (
  userId: string,
  imageSource: string,
  videoSource: string,
  caption: string,
) => {
  const imageUrl = await uploadMedia(imageSource, 'image');
  const videoUrl = await uploadMedia(videoSource, 'video');

  const postRef = doc(collection(db, 'posts'));
  return await setDoc(postRef, {
    postId: postRef.id,
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
  const ref = collection(db, 'posts');
  const snapshot = await getDocs(ref);
  const extractor: DocumentData[] = [];
  // biome-ignore lint/complexity/noForEach: <explanation>
  snapshot.forEach(_post => {
    const post = postSchema.safeParse(_post.data());
    if (post.success) {
      extractor.push(post.data);
    }
  });

  return extractor as Post[];
};

export { createPost, getPosts };
