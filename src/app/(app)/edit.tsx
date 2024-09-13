import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar } from '@piccy/native';
import * as MediaPicker from 'expo-image-picker';
import { Link, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Col, Container, Inline } from '@/components/ui/container';
import { Ionicons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import { Label } from '@/components/ui/typography';
import { useAuth } from '@/hooks/useAuth';
import { uploadMedia } from '@/services/firebase/media';

const userSchema = z.object({
  firstName: z
    .string()
    .min(3)
    .max(10)
    .trim()
    .transform(data => data.toLowerCase()),
  lastName: z
    .string()
    .min(3)
    .max(10)
    .trim()
    .transform(data => data.toLowerCase()),
  bio: z
    .string()
    .min(3)
    .max(160)
    .trim()
    .transform(data => data.toLowerCase()),
  profileImage: z.string().url(),
});

export { ErrorBoundary } from 'expo-router';

export default (): JSX.Element => {
  const router = useRouter();
  const { user, updateSelf } = useAuth();
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const { control, handleSubmit, setFocus, setValue, reset } = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
  });

  const previewLink = useMemo(() => {
    return previewUrl.length > 1
      ? { uri: previewUrl }
      : typeof user?.profileImage === 'string'
        ? { uri: user?.profileImage }
        : undefined;
  }, [previewUrl, user?.profileImage]);

  const onSubmit: SubmitHandler<z.infer<typeof userSchema>> = useCallback(
    data => {
      if (typeof user?.userId === 'string') {
        setIsLoading(true);
        updateSelf({
          name: { first: data.firstName, last: data.lastName },
          profileImage: data.profileImage,
          bio: data.bio,
        })
          .then(() => {
            reset({ firstName: '', lastName: '', bio: '', profileImage: '' });
            router.replace('/settings');
          })
          .catch(console.log)
          .finally(() => {
            setIsLoading(false);
          });
      }
    },
    [reset, router, updateSelf, user?.userId],
  );

  const onClickMediaPicker = useCallback(async () => {
    const result = await MediaPicker.launchImageLibraryAsync({
      mediaTypes: MediaPicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setIsProfileLoading(true);
      const imageUrl = await uploadMedia(result.assets[0].uri, 'image', 'users');
      setValue('profileImage', imageUrl);
      setPreviewUrl(imageUrl);
      setIsProfileLoading(false);
    }
  }, [setValue]);

  return (
    <Container className="gap-6">
      {isLoading && <Loading />}

      <Inline className="justify-start gap-4">
        <Link asChild href="/settings">
          <Ionicons name="chevron-back" size={24} className="text-slate-800" />
        </Link>
        <Label>Edit Profile</Label>
      </Inline>

      <Col className="gap-4">
        <View className="relative mx-auto size-28 items-center justify-center overflow-hidden rounded-full">
          {isProfileLoading && <Loading />}
          <Pressable onPress={onClickMediaPicker}>
            <Avatar size={92} rounded="full" value={user?.userId ?? ''} source={previewLink} />
          </Pressable>
        </View>

        <Input
          name="firstName"
          // @ts-ignore
          control={control}
          label="First Name"
          returnKeyType="next"
          placeholder="Enter your first name"
          defaultValue={user?.name.first ?? undefined}
          onSubmitEditing={() => setFocus('lastName')}
        />
        <Input
          name="lastName"
          // @ts-ignore
          control={control}
          label="Last Name"
          returnKeyType="next"
          placeholder="Enter your last name"
          onSubmitEditing={() => setFocus('bio')}
          defaultValue={user?.name.last ?? undefined}
        />
        <Input
          name="bio"
          label="Bio"
          // @ts-ignore
          control={control}
          returnKeyType="done"
          placeholder="Enter your bio"
          defaultValue={user?.bio ?? undefined}
        />
      </Col>

      <Button
        title="Update"
        textClassName="text-white"
        onPress={handleSubmit(onSubmit)}
        className="mt-auto bg-blue-500 shadow-blue-500 shadow-lg"
      />
    </Container>
  );
};
