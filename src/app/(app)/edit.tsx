import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Col, Container, Inline } from '@/components/ui/container';
import { Ionicons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import { Label } from '@/components/ui/typography';
import { useAuth } from '@/hooks/useAuth';

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
});

export default (): JSX.Element => {
  const router = useRouter();
  const { user, updateSelf } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, setFocus, reset } = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof userSchema>> = useCallback(
    data => {
      if (typeof user?.userId === 'string') {
        setIsLoading(true);
        updateSelf({ name: { first: data.firstName, last: data.lastName }, bio: data.bio })
          .then(() => {
            reset({ firstName: '', lastName: '', bio: '' });
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
