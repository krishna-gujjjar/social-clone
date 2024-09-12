import { Ionicons } from '@/components/ui/icons';

interface IconProps {
  color: string;
  size: number;
}

export const icons: Record<string, (props: IconProps) => JSX.Element> = {
  index: (props: IconProps) => <Ionicons name="home" color={props.color} size={props.size} />,
  create: (props: IconProps) => <Ionicons name="duplicate" color={props.color} size={props.size} />,
  search: (props: IconProps) => <Ionicons name="search" color={props.color} size={props.size} />,
  profile: (props: IconProps) => <Ionicons name="person" color={props.color} size={props.size} />,
};
