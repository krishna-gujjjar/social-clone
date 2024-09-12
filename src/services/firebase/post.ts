import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import type { DocumentData, QuerySnapshot } from 'firebase/firestore';

import { now } from '@/utils/common';
import { postSchema } from '../schema/post';
import type { Post } from '../schema/post';
import { db } from './firebase';
import { uploadMedia } from './media';
import { updateUser } from './user';

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
  await setDoc(ref, {
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

  // @ts-ignore
  return await updateUser(userId, { posts: arrayUnion(ref.id) });
};

const getPost = async (uid: string) => {
  const post = await getDoc(doc(db, 'posts', uid));
  return postSchema.safeParse(post.data())?.data;
};

const getPosts = async () => {
  const q = query(postRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  return _extractSnapshots(snapshot);
};

const searchPosts = async (search?: string) => {
  const q = query(postRef, where('caption', '>=', search));
  const snapshot = await getDocs(q);

  return _extractSnapshots(snapshot);
};

const postsById = async (userId?: string) => {
  const q = query(postRef, where('userId', '==', userId));
  const snapshot = await getDocs(q);

  return _extractSnapshots(snapshot);
};

const updatePost = async (postId: string, post: Partial<Post>) => {
  return await updateDoc(doc(db, 'posts', postId), { ...post, updatedAt: now });
};

export { createPost, getPost, getPosts, postsById, searchPosts, updatePost };
