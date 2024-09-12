import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

const uploadMedia = async (uri: string, fileType: 'image' | 'video', folder = 'posts') => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const file = new File([blob], uri.split('/').pop()?.split('.')[0] ?? '', {
    type: fileType === 'video' ? 'video/mp4' : 'image/jpeg',
  });

  const storageRef = ref(storage, `${folder}/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export { uploadMedia };
