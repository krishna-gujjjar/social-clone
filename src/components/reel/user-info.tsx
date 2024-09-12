import { Avatar } from '@piccy/native';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { followUserAction } from '@/services/firebase/metaData';
import { getUser } from '@/services/firebase/user';
import type { User } from '@/services/schema/auth';
import { useStore } from '@/services/storages';
import { cn } from '@/utils/style';
import { Button } from '../ui/button';
import { ConditionalRender } from '../ui/conditional-render';
import { Col, Inline } from '../ui/container';
import { Tiny } from '../ui/typography';

interface UserInfoProps {
  userId: string;
  caption: string;
}

const Component = (props: UserInfoProps): JSX.Element => {
  const [user, setUser] = useState<User>();
  const currentUser = useStore(state => state.userData);
  const isFollowing = useMemo(
    () => currentUser?.following.includes(user?.userId as string) ?? false,
    [currentUser?.following, user?.userId],
  );

  const fetchUser = useCallback(() => {
    getUser(props.userId)
      .then(_userData => {
        if (typeof _userData !== 'undefined') {
          setUser(_userData);
        }
      })
      .catch(console.log);
  }, [props.userId]);

  const onFollow = useCallback(() => {
    followUserAction(user?.userId as string, isFollowing);
  }, [user?.userId, isFollowing]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Inline className="absolute bottom-[15%] left-6 justify-start gap-2 rounded-3xl">
      <Avatar
        rounded="full"
        withColoredBorder
        value={user?.userId ?? ''}
        source={typeof user?.profileImage === 'string' ? { uri: user?.profileImage } : undefined}
      />
      <Col className="gap-1">
        <Inline className="justify-start gap-2">
          <Tiny className="font-[GeneralSansSemibold] text-slate-100 capitalize">
            {`${user?.name.first ?? 'No'} ${user?.name.last ?? 'Name'}`}
          </Tiny>
          <ConditionalRender shouldRender={currentUser?.userId !== user?.userId}>
            <Button
              onPress={onFollow}
              title={isFollowing ? 'Unfollow' : 'Follow'}
              textClassName={cn('text-sm', isFollowing ? 'text-red-500' : 'text-slate-100')}
              className={cn(
                'w-[70] rounded-lg border-2 p-1',
                isFollowing ? 'border-red-500' : 'border-slate-100',
              )}
            />
          </ConditionalRender>
        </Inline>
        <Tiny className="text-[GeneralSansSemibold] text-slate-100">{props.caption}</Tiny>
      </Col>
    </Inline>
  );
};

const UserInfo = memo(Component);
export { UserInfo };
