import { collection, doc, setDoc } from 'firebase/firestore';

import { now } from '@/utils/common';
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

export { createPost };
