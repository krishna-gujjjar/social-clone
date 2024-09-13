import { Ionicons } from '@/components/ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import * as MediaPicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import * as VideoThumbnail from 'expo-video-thumbnails';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Image } from 'react-native';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Col, Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import { Label, Tiny, Title } from '@/components/ui/typography';
import { useAuth } from '@/hooks/useAuth';
import { createPost } from '@/services/firebase/post';

const formSchema = z.object({
  caption: z
    .string()
    .min(3)
    .max(80)
    .transform(data => data.toLowerCase().trim()),
  videoUrl: z.string().url(),
});

type FormSchema = z.infer<typeof formSchema>;

export { ErrorBoundary } from 'expo-router';

export default (): JSX.Element => {
  const router = useRouter();
  const { user } = useAuth();
  const [preview, setPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { control, formState, handleSubmit, setValue, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = useCallback(
    async data => {
      if (typeof user?.userId === 'string') {
        setIsLoading(true);
        createPost(user.userId, preview, data.videoUrl, data.caption)
          .then(() => {
            setPreview('');
            reset({ caption: '', videoUrl: '' });
            router.navigate('/');
          })
          .catch(console.log)
          .finally(() => {
            setIsLoading(false);
          });
      }
    },
    [user?.userId, router.navigate, reset, preview],
  );

  const generateThumbnail = useCallback(async (_uri: string) => {
    const result = await VideoThumbnail.getThumbnailAsync(_uri, {
      time: 1,
      quality: 0.7,
    });
    setPreview(result.uri);
  }, []);

  const onClickMediaPicker = useCallback(async () => {
    const result = await MediaPicker.launchImageLibraryAsync({
      mediaTypes: MediaPicker.MediaTypeOptions.Videos,
      quality: 1,
    });

    if (!result.canceled) {
      setValue('videoUrl', result.assets[0].uri);
      generateThumbnail(result.assets[0].uri);
    }
  }, [generateThumbnail, setValue]);

  return (
    <Container className="gap-4">
      <Title>Create new post</Title>

      {isLoading && <Loading />}

      <Input
        name="caption"
        label="Caption"
        // @ts-ignore
        control={control}
        placeholder="Caption"
      />

      <Col>
        {formState.errors.videoUrl && (
          <Tiny className="mb-2 text-red-400">Please select a video first.</Tiny>
        )}

        <Button
          onPress={onClickMediaPicker}
          className="items-center justify-center rounded-3xl bg-slate-400/80"
        >
          {preview === '' ? (
            <Ionicons name="attach" size={90} className="my-48 text-slate-100" />
          ) : (
            <Image className="h-[428] w-full rounded-2xl" source={{ uri: preview }} />
          )}
        </Button>
      </Col>

      <Button
        onPress={handleSubmit(onSubmit)}
        className="flex-row items-center justify-center gap-2 bg-blue-500 shadow-blue-500 shadow-lg"
      >
        <Ionicons name="cloud-upload" className="text-slate-100" size={26} />
        <Label className="text-white">Upload</Label>
      </Button>
    </Container>
  );
};
